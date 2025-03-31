// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./openzeppelin/ERC20Burnable.sol";
import "../utils/Ownable.sol";

/**
 * @title CroakToken
 * @dev ERC20 token with burning and minting capabilities.
 */
contract CroakToken is ERC20Burnable, Ownable {
    // Events
    event TaxRateChanged(uint256 newBuyTaxRate, uint256 newSellTaxRate);
    event TaxExemptStatusChanged(address account, bool status);
    event TreasuryAddressChanged(address newTreasuryAddress);
    event TradingEnabled();

    // Constants - moved to immutable where possible
    uint256 public immutable MAX_TAX_RATE = 1000; // 10% (in basis points)
    uint256 private constant BASIS_POINTS = 10000; // 100%
    
    // State variables
    uint256 public buyTaxRate = 300; // 3% (in basis points)
    uint256 public sellTaxRate = 300; // 3% (in basis points)
    address public treasuryAddress;
    bool public tradingEnabled = false;
    
    // Mappings
    mapping(address => bool) public isTaxExempt;
    mapping(address => bool) public isAuthorizedPair;

    constructor(address initialOwner) 
        ERC20Burnable("Croak Token", "CROAK")
        Ownable(initialOwner) 
    {
        treasuryAddress = msg.sender;
        isTaxExempt[msg.sender] = true;
        
        // Mint initial supply to the owner
        _mint(initialOwner, 200_000_000 * 10**decimals()); // 200 million tokens
    }
    
    function enableTrading() external onlyOwner {
        require(!tradingEnabled, "Trading already enabled");
        tradingEnabled = true;
        emit TradingEnabled();
    }
    
    function setTaxRates(uint256 newBuyTaxRate, uint256 newSellTaxRate) external onlyOwner {
        require(newBuyTaxRate <= MAX_TAX_RATE, "Buy tax rate exceeds maximum");
        require(newSellTaxRate <= MAX_TAX_RATE, "Sell tax rate exceeds maximum");
        
        buyTaxRate = newBuyTaxRate;
        sellTaxRate = newSellTaxRate;
        
        emit TaxRateChanged(newBuyTaxRate, newSellTaxRate);
    }
    
    function setTaxExemptStatus(address account, bool status) external onlyOwner {
        isTaxExempt[account] = status;
        emit TaxExemptStatusChanged(account, status);
    }
    
    function setTreasuryAddress(address newTreasuryAddress) external onlyOwner {
        require(newTreasuryAddress != address(0), "Treasury cannot be zero address");
        treasuryAddress = newTreasuryAddress;
        emit TreasuryAddressChanged(newTreasuryAddress);
    }
    
    function setAuthorizedPair(address pair, bool status) external onlyOwner {
        isAuthorizedPair[pair] = status;
    }
    
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        // Check if trading is enabled
        if (!tradingEnabled) {
            require(
                isTaxExempt[sender] || isTaxExempt[recipient],
                "Trading not yet enabled"
            );
        }
        
        // If sender or recipient is tax exempt, no tax is applied
        if (isTaxExempt[sender] || isTaxExempt[recipient]) {
            super._transfer(sender, recipient, amount);
            return;
        }
        
        uint256 taxAmount = 0;
        
        // Apply buy tax (when buying from a pair)
        if (isAuthorizedPair[sender]) {
            taxAmount = (amount * buyTaxRate) / BASIS_POINTS;
        }
        // Apply sell tax (when selling to a pair)
        else if (isAuthorizedPair[recipient]) {
            taxAmount = (amount * sellTaxRate) / BASIS_POINTS;
        }
        
        // Transfer tax to treasury if applicable
        if (taxAmount > 0) {
            super._transfer(sender, treasuryAddress, taxAmount);
        }
        
        // Transfer remaining amount to recipient
        super._transfer(sender, recipient, amount - taxAmount);
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}