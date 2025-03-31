// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "../interfaces/IERC20.sol";
import "../utils/SafeERC20.sol";
import "../utils/Ownable.sol";
import "../utils/ReentrancyGuard.sol";

/**
 * @title CroakStaking
 * @dev A staking contract for CROAK tokens with different lock periods and rewards.
 */
contract CroakStaking is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    // Staking token (CROAK)
    IERC20 public immutable stakingToken;
    
    // Constants - using immutable to save gas and bytecode
    uint256 public constant LOCK_PERIOD_7_DAYS = 7 days;
    uint256 public constant LOCK_PERIOD_30_DAYS = 30 days;
    uint256 public constant LOCK_PERIOD_90_DAYS = 90 days;
    uint256 public constant BONUS_7_DAYS = 10000; // 1x (no bonus)
    uint256 public constant BONUS_30_DAYS = 12000; // 1.2x
    uint256 public constant BONUS_90_DAYS = 15000; // 1.5x
    uint256 public constant BASIS_POINTS = 10000; // 100%
    
    // State variables
    uint256 public rewardRate;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    uint256 public minimumStake = 100 * 10**18; // 100 CROAK
    uint256 public totalStaked;
    uint256 public earlyWithdrawalFee = 2000; // 20% in basis points
    address public feeRecipient;
    
    // Staker info - packed to save storage
    struct StakerInfo {
        uint256 stakedAmount;
        uint256 lockPeriod;
        uint256 lockEndTime;
        uint256 lastRewardPerToken;
        uint256 rewards;
    }
    
    // Mapping of staker address to their info
    mapping(address => StakerInfo) public stakers;
    
    // Events
    event Staked(address indexed user, uint256 amount, uint256 lockPeriod);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);
    event MinimumStakeUpdated(uint256 newMinimum);
    event EarlyWithdrawalFeeUpdated(uint256 newFee);
    event FeeRecipientUpdated(address newRecipient);
    
    constructor(
        address _stakingToken,
        uint256 _rewardRate,
        address _feeRecipient,
        address initialOwner
    ) Ownable(initialOwner) {
        require(_stakingToken != address(0), "Staking token cannot be zero address");
        require(_feeRecipient != address(0), "Fee recipient cannot be zero address");
        
        stakingToken = IERC20(_stakingToken);
        rewardRate = _rewardRate;
        feeRecipient = _feeRecipient;
        lastUpdateTime = block.timestamp;
    }
    
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        
        if (account != address(0)) {
            stakers[account].rewards = earned(account);
            stakers[account].lastRewardPerToken = rewardPerTokenStored;
        }
        _;
    }
    
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        
        return rewardPerTokenStored + (
            ((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / totalStaked
        );
    }
    
    function earned(address account) public view returns (uint256) {
        StakerInfo storage staker = stakers[account];
        
        // Calculate base rewards
        uint256 baseRewards = staker.rewards;
        
        // Add new rewards since last update
        if (staker.stakedAmount > 0) {
            uint256 newRewards = (
                staker.stakedAmount * 
                (rewardPerToken() - staker.lastRewardPerToken)
            ) / 1e18;
            
            // Apply lock period bonus
            uint256 bonus;
            if (staker.lockPeriod == LOCK_PERIOD_7_DAYS) {
                bonus = BONUS_7_DAYS;
            } else if (staker.lockPeriod == LOCK_PERIOD_30_DAYS) {
                bonus = BONUS_30_DAYS;
            } else if (staker.lockPeriod == LOCK_PERIOD_90_DAYS) {
                bonus = BONUS_90_DAYS;
            }
            
            newRewards = (newRewards * bonus) / BASIS_POINTS;
            baseRewards += newRewards;
        }
        
        return baseRewards;
    }
    
    function stake(uint256 amount, uint256 lockPeriod) external nonReentrant updateReward(msg.sender) {
        require(amount >= minimumStake, "Amount below minimum stake");
        require(
            lockPeriod == LOCK_PERIOD_7_DAYS || 
            lockPeriod == LOCK_PERIOD_30_DAYS || 
            lockPeriod == LOCK_PERIOD_90_DAYS,
            "Invalid lock period"
        );
        
        // Transfer tokens from user to contract
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Update staker info
        StakerInfo storage staker = stakers[msg.sender];
        
        // If user already has staked tokens, claim rewards first
        if (staker.stakedAmount > 0) {
            _claimReward(msg.sender);
        }
        
        staker.stakedAmount += amount;
        staker.lockPeriod = lockPeriod;
        staker.lockEndTime = block.timestamp + lockPeriod;
        
        // Update total staked
        totalStaked += amount;
        
        emit Staked(msg.sender, amount, lockPeriod);
    }
    
    function withdraw(uint256 amount) external nonReentrant updateReward(msg.sender) {
        StakerInfo storage staker = stakers[msg.sender];
        require(staker.stakedAmount >= amount, "Insufficient staked amount");
        
        // Claim any pending rewards first
        _claimReward(msg.sender);
        
        // Check if lock period has ended
        bool isEarlyWithdrawal = block.timestamp < staker.lockEndTime;
        uint256 withdrawalAmount = amount;
        
        // Apply early withdrawal fee if applicable
        if (isEarlyWithdrawal) {
            uint256 feeAmount = (amount * earlyWithdrawalFee) / BASIS_POINTS;
            withdrawalAmount = amount - feeAmount;
            
            // Transfer fee to fee recipient
            stakingToken.safeTransfer(feeRecipient, feeAmount);
        }
        
        // Update staker info
        staker.stakedAmount -= amount;
        
        // Update total staked
        totalStaked -= amount;
        
        // Transfer tokens back to user
        stakingToken.safeTransfer(msg.sender, withdrawalAmount);
        
        emit Withdrawn(msg.sender, withdrawalAmount);
    }
    
    function claimReward() external nonReentrant updateReward(msg.sender) {
        _claimReward(msg.sender);
    }
    
    function _claimReward(address account) internal {
        uint256 reward = stakers[account].rewards;
        if (reward > 0) {
            stakers[account].rewards = 0;
            stakingToken.safeTransfer(account, reward);
            emit RewardClaimed(account, reward);
        }
    }
    
    function getStakerInfo(address account) external view returns (
        uint256 stakedAmount,
        uint256 lockPeriod,
        uint256 lockEndTime,
        uint256 pendingRewards
    ) {
        StakerInfo storage staker = stakers[account];
        return (
            staker.stakedAmount,
            staker.lockPeriod,
            staker.lockEndTime,
            earned(account)
        );
    }
    
    function setRewardRate(uint256 _rewardRate) external onlyOwner updateReward(address(0)) {
        rewardRate = _rewardRate;
        emit RewardRateUpdated(_rewardRate);
    }
    
    function setMinimumStake(uint256 _minimumStake) external onlyOwner {
        minimumStake = _minimumStake;
        emit MinimumStakeUpdated(_minimumStake);
    }
    
    function setEarlyWithdrawalFee(uint256 _earlyWithdrawalFee) external onlyOwner {
        require(_earlyWithdrawalFee <= 3000, "Fee too high"); // Max 30%
        earlyWithdrawalFee = _earlyWithdrawalFee;
        emit EarlyWithdrawalFeeUpdated(_earlyWithdrawalFee);
    }
    
    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        require(_feeRecipient != address(0), "Fee recipient cannot be zero address");
        feeRecipient = _feeRecipient;
        emit FeeRecipientUpdated(_feeRecipient);
    }
    
    function recoverERC20(address tokenAddress, uint256 amount) external onlyOwner {
        if (tokenAddress == address(stakingToken)) {
            uint256 availableAmount = stakingToken.balanceOf(address(this)) - totalStaked;
            require(amount <= availableAmount, "Cannot recover staked tokens");
        }
        
        IERC20(tokenAddress).safeTransfer(owner(), amount);
    }
}