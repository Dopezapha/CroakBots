// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "../interfaces/IERC20.sol";
import "../utils/SafeERC20.sol";
import "../utils/Ownable.sol";
import "../utils/ReentrancyGuard.sol";

/**
 * @title CroakSwap
 * @dev A simple DEX for swapping between CROAK and other tokens.
 */
contract CroakSwap is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    // CROAK token address - made immutable
    address public immutable croakToken;
    
    // Constants - moved to constants from variables
    uint256 public constant SWAP_FEE = 30; // 0.3%
    uint256 public constant BASIS_POINTS = 10000; // 100%
    
    // Fee collector address
    address public feeCollector;
    
    // Supported token pairs
    struct TokenPair {
        bool isSupported;
        uint256 croakReserve;
        uint256 tokenReserve;
    }
    
    // Mapping of token address to pair info
    mapping(address => TokenPair) public tokenPairs;
    
    // List of supported tokens
    address[] public supportedTokens;
    
    // Events
    event TokenPairAdded(address indexed token);
    event TokenPairRemoved(address indexed token);
    event LiquidityAdded(address indexed token, uint256 croakAmount, uint256 tokenAmount);
    event LiquidityRemoved(address indexed token, uint256 croakAmount, uint256 tokenAmount);
    event Swap(address indexed fromToken, address indexed toToken, uint256 amountIn, uint256 amountOut);
    event FeeCollectorUpdated(address indexed newFeeCollector);
    
    constructor(
        address _croakToken,
        address _feeCollector,
        address initialOwner
    ) Ownable(initialOwner) {
        require(_croakToken != address(0), "CROAK token cannot be zero address");
        require(_feeCollector != address(0), "Fee collector cannot be zero address");
        
        croakToken = _croakToken;
        feeCollector = _feeCollector;
    }
    
    function addTokenPair(address token) external onlyOwner {
        require(token != address(0), "Token cannot be zero address");
        require(token != croakToken, "Token cannot be CROAK");
        require(!tokenPairs[token].isSupported, "Token pair already exists");
        
        tokenPairs[token] = TokenPair({
            isSupported: true,
            croakReserve: 0,
            tokenReserve: 0
        });
        
        supportedTokens.push(token);
        
        emit TokenPairAdded(token);
    }
    
    function removeTokenPair(address token) external onlyOwner {
        require(tokenPairs[token].isSupported, "Token pair does not exist");
        require(tokenPairs[token].croakReserve == 0 && tokenPairs[token].tokenReserve == 0, "Liquidity must be zero");
        
        // Remove from supported tokens array
        for (uint256 i = 0; i < supportedTokens.length; i++) {
            if (supportedTokens[i] == token) {
                supportedTokens[i] = supportedTokens[supportedTokens.length - 1];
                supportedTokens.pop();
                break;
            }
        }
        
        delete tokenPairs[token];
        
        emit TokenPairRemoved(token);
    }
    
    function addLiquidity(
        address token,
        uint256 croakAmount,
        uint256 tokenAmount
    ) external nonReentrant {
        require(tokenPairs[token].isSupported, "Token pair not supported");
        require(croakAmount > 0 && tokenAmount > 0, "Amounts must be greater than zero");
        
        TokenPair storage pair = tokenPairs[token];
        
        // Transfer tokens to contract
        IERC20(croakToken).safeTransferFrom(msg.sender, address(this), croakAmount);
        IERC20(token).safeTransferFrom(msg.sender, address(this), tokenAmount);
        
        // Update reserves
        pair.croakReserve += croakAmount;
        pair.tokenReserve += tokenAmount;
        
        emit LiquidityAdded(token, croakAmount, tokenAmount);
    }
    
    function removeLiquidity(
        address token,
        uint256 croakAmount,
        uint256 tokenAmount
    ) external nonReentrant onlyOwner {
        require(tokenPairs[token].isSupported, "Token pair not supported");
        
        TokenPair storage pair = tokenPairs[token];
        require(pair.croakReserve >= croakAmount, "Insufficient CROAK reserve");
        require(pair.tokenReserve >= tokenAmount, "Insufficient token reserve");
        
        // Update reserves
        pair.croakReserve -= croakAmount;
        pair.tokenReserve -= tokenAmount;
        
        // Transfer tokens to owner
        IERC20(croakToken).safeTransfer(msg.sender, croakAmount);
        IERC20(token).safeTransfer(msg.sender, tokenAmount);
        
        emit LiquidityRemoved(token, croakAmount, tokenAmount);
    }
    
    function swapCroakForToken(
        address token,
        uint256 croakAmount,
        uint256 minTokenAmount
    ) external nonReentrant returns (uint256) {
        require(tokenPairs[token].isSupported, "Token pair not supported");
        require(croakAmount > 0, "Amount must be greater than zero");
        
        TokenPair storage pair = tokenPairs[token];
        require(pair.croakReserve > 0 && pair.tokenReserve > 0, "Insufficient liquidity");
        
        // Calculate output amount using constant product formula (x * y = k)
        uint256 numerator = croakAmount * pair.tokenReserve * (BASIS_POINTS - SWAP_FEE);
        uint256 denominator = (pair.croakReserve * BASIS_POINTS) + (croakAmount * (BASIS_POINTS - SWAP_FEE));
        uint256 tokenAmount = numerator / denominator;
        
        require(tokenAmount >= minTokenAmount, "Slippage too high");
        require(tokenAmount <= pair.tokenReserve, "Insufficient token reserve");
        
        // Calculate fee amount
        uint256 feeAmount = (croakAmount * SWAP_FEE) / BASIS_POINTS;
        
        // Transfer CROAK from user to contract
        IERC20(croakToken).safeTransferFrom(msg.sender, address(this), croakAmount);
        
        // Transfer fee to fee collector
        IERC20(croakToken).safeTransfer(feeCollector, feeAmount);
        
        // Update reserves (subtract fee from CROAK amount)
        pair.croakReserve += (croakAmount - feeAmount);
        pair.tokenReserve -= tokenAmount;
        
        // Transfer token to user
        IERC20(token).safeTransfer(msg.sender, tokenAmount);
        
        emit Swap(croakToken, token, croakAmount, tokenAmount);
        
        return tokenAmount;
    }
    
    function swapTokenForCroak(
        address token,
        uint256 tokenAmount,
        uint256 minCroakAmount
    ) external nonReentrant returns (uint256) {
        require(tokenPairs[token].isSupported, "Token pair not supported");
        require(tokenAmount > 0, "Amount must be greater than zero");
        
        TokenPair storage pair = tokenPairs[token];
        require(pair.croakReserve > 0 && pair.tokenReserve > 0, "Insufficient liquidity");
        
        // Calculate output amount using constant product formula (x * y = k)
        uint256 numerator = tokenAmount * pair.croakReserve * (BASIS_POINTS - SWAP_FEE);
        uint256 denominator = (pair.tokenReserve * BASIS_POINTS) + (tokenAmount * (BASIS_POINTS - SWAP_FEE));
        uint256 croakAmount = numerator / denominator;
        
        require(croakAmount >= minCroakAmount, "Slippage too high");
        require(croakAmount <= pair.croakReserve, "Insufficient CROAK reserve");
        
        // Calculate fee amount
        uint256 feeAmount = (croakAmount * SWAP_FEE) / BASIS_POINTS;
        
        // Transfer token from user to contract
        IERC20(token).safeTransferFrom(msg.sender, address(this), tokenAmount);
        
        // Update reserves
        pair.tokenReserve += tokenAmount;
        pair.croakReserve -= croakAmount;
        
        // Transfer CROAK to user (minus fee)
        IERC20(croakToken).safeTransfer(msg.sender, croakAmount - feeAmount);
        
        // Transfer fee to fee collector
        IERC20(croakToken).safeTransfer(feeCollector, feeAmount);
        
        emit Swap(token, croakToken, tokenAmount, croakAmount);
        
        return croakAmount;
    }
    
    function getExchangeRate(address token) external view returns (uint256 croakToToken, uint256 tokenToCroak) {
        require(tokenPairs[token].isSupported, "Token pair not supported");
        
        TokenPair storage pair = tokenPairs[token];
        require(pair.croakReserve > 0 && pair.tokenReserve > 0, "Insufficient liquidity");
        
        croakToToken = (pair.tokenReserve * 1e18) / pair.croakReserve;
        tokenToCroak = (pair.croakReserve * 1e18) / pair.tokenReserve;
    }
    
    function getSupportedTokensCount() external view returns (uint256) {
        return supportedTokens.length;
    }
    
    function setFeeCollector(address _feeCollector) external onlyOwner {
        require(_feeCollector != address(0), "Fee collector cannot be zero address");
        feeCollector = _feeCollector;
        emit FeeCollectorUpdated(_feeCollector);
    }
    
    function recoverERC20(address tokenAddress, uint256 amount) external onlyOwner {
        // Cannot recover tokens that are part of liquidity pools
        if (tokenAddress == croakToken) {
            uint256 totalReserve = 0;
            for (uint256 i = 0; i < supportedTokens.length; i++) {
                totalReserve += tokenPairs[supportedTokens[i]].croakReserve;
            }
            require(IERC20(croakToken).balanceOf(address(this)) - amount >= totalReserve, "Cannot recover reserved CROAK");
        } else {
            require(!tokenPairs[tokenAddress].isSupported || 
                    IERC20(tokenAddress).balanceOf(address(this)) - amount >= tokenPairs[tokenAddress].tokenReserve, 
                    "Cannot recover reserved tokens");
        }
        
        IERC20(tokenAddress).safeTransfer(owner(), amount);
    }
}