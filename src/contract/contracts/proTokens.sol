// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract proToken is ERC20, Ownable {
  constructor() ERC20("proToken", "PRO") onlyOwner {
    _mint(msg.sender, 10000000000 * 10**18);
  }
  
}
