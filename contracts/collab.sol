// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./staking/CroakStaking.sol";
import "./swap/CroakSwap.sol";
import {CroakToken} from "./token/CroakToken.sol";
import "./utils/SafeERC20.sol";

/**
 * @title Collab
 * @dev A contract that deploys and manages the Croak ecosystem contracts
 */
contract Collab is Ownable {
    using SafeERC20 for IERC20;
    
    CroakToken public croakToken;
    CroakStaking public stakingContract;
    CroakSwap public swapContract;
    
    address public treasuryAddress;
    
    event CroakEcosystemDeployed(
        address indexed tokenAddress, 
        address indexed stakingAddress, 
        address indexed swapAddress
    );
    event StakingContractUpdated(address indexed newStakingAddress);
    event SwapContractUpdated(address indexed newSwapAddress);
    
    constructor(address _treasuryAddress) Ownable(msg.sender) {
        require(_treasuryAddress != address(0), "Treasury cannot be zero address");
        treasuryAddress = _treasuryAddress;
        
        // Deploy token contract
        croakToken = new CroakToken(address(this));
        
        // Deploy staking contract with ~0.1 CROAK per day reward rate
        uint256 rewardRatePerSecond = 1157407407407;
        stakingContract = new CroakStaking(
            address(croakToken),
            rewardRatePerSecond,
            treasuryAddress,
            address(this)
        );
        
        // Deploy swap contract
        swapContract = new CroakSwap(
            address(croakToken),
            treasuryAddress,
            address(this)
        );
        
        // Set tax exemptions
        croakToken.setTaxExemptStatus(address(stakingContract), true);
        croakToken.setTaxExemptStatus(address(swapContract), true);
        
        // Transfer tokens
        croakToken.transfer(treasuryAddress, 20_000_000 * 10**18);
        croakToken.transfer(address(stakingContract), 10_000_000 * 10**18);
        
        emit CroakEcosystemDeployed(
            address(croakToken),
            address(stakingContract),
            address(swapContract)
        );
    }
    
    function updateStakingContract(address _newStakingContract) external onlyOwner {
        require(_newStakingContract != address(0), "Invalid address");
        stakingContract = CroakStaking(_newStakingContract);
        croakToken.setTaxExemptStatus(_newStakingContract, true);
        emit StakingContractUpdated(_newStakingContract);
    }
    
    function updateSwapContract(address _newSwapContract) external onlyOwner {
        require(_newSwapContract != address(0), "Invalid address");
        swapContract = CroakSwap(_newSwapContract);
        croakToken.setTaxExemptStatus(_newSwapContract, true);
        emit SwapContractUpdated(_newSwapContract);
    }
    
    function setupTokenPair(address tokenAddress) external onlyOwner {
        swapContract.addTokenPair(tokenAddress);
    }
    
    function addLiquidity(
        address tokenAddress,
        uint256 croakAmount,
        uint256 tokenAmount
    ) external onlyOwner {
        croakToken.transfer(address(swapContract), croakAmount);
        IERC20(tokenAddress).safeApprove(address(swapContract), tokenAmount);
        swapContract.addLiquidity(tokenAddress, croakAmount, tokenAmount);
    }
    
    function enableTrading() external onlyOwner {
        croakToken.enableTrading();
    }
    
    function updateTreasuryAddress(address _newTreasuryAddress) external onlyOwner {
        require(_newTreasuryAddress != address(0), "Invalid address");
        treasuryAddress = _newTreasuryAddress;
        
        croakToken.setTreasuryAddress(_newTreasuryAddress);
        stakingContract.setFeeRecipient(_newTreasuryAddress);
        swapContract.setFeeCollector(_newTreasuryAddress);
    }
    
    function getContractAddresses() external view returns (
        address tokenAddress,
        address stakingAddress,
        address swapAddress
    ) {
        return (
            address(croakToken),
            address(stakingContract),
            address(swapContract)
        );
    }
    
    function recoverERC20(address tokenAddress, uint256 amount) external onlyOwner {
        IERC20(tokenAddress).transfer(owner(), amount);
    }
}