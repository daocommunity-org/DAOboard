// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.9;
import "./proTokens.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

contract dLEAD is proToken {
  address public Owner = msg.sender;
  struct Member {
    string name;
    string regNo;
    uint256 point;
    bool activated;
    bool coordinator;
    string role;
    address walletAddress;
    uint256 claimableTokens;
    bool underTask;
  }

  struct Task {
    uint256 taskId;
    string taskName;
    string taskDesc;
    uint256 pointsAlotted;
    bool status; // open or close
    uint256 count;
    address initiator;
    uint256 timeInitiated;
  }

  Task[] public taskArray;
  uint256 public taskCount;

  mapping(address => string) regNoOf;
  Member[] public members;
  mapping(address => uint256) Id;
  mapping(address => bool) isAdmin;
  mapping(address => bool) isRegistered;
  address[] registeredAddresses;

  mapping(address => uint256) public taskRegistrations;
  mapping(uint256 => mapping(address => bool)) public taskDone;
  mapping(uint256 => mapping(address => bool)) public taskEligible;
  mapping(uint256 => mapping(address => string)) public taskComments;

  uint256 public length;
  bool flag = false;

  constructor() {
    isAdmin[msg.sender] = true;
    length = 0;
  }

  function returnTaskDone(
    uint256 taskId,
    address userAddress
  ) external view returns (bool) {
    return taskDone[taskId][userAddress];
  }

  function returnTaskEligible(
    uint256 taskId,
    address userAddress
  ) external view returns (bool) {
    return taskEligible[taskId][userAddress];
  }

  function returnTaskComments(
    uint256 taskId,
    address userAddress
  ) external view returns (string memory) {
    return taskComments[taskId][userAddress];
  }

  function returnData() public view returns (Member[] memory) {
    return members;
  }

  function returnTasks() public view returns (Task[] memory) {
    return taskArray;
  }

  function AdminStatus() public view returns (bool stat) {
    return isAdmin[msg.sender];
  }

  function makeAdmin(address walletAddress) public payable {
    require(isAdmin[msg.sender], "Non admin  access denied");
    isAdmin[walletAddress] = true;
  }

  function revokeAdmin(address walletAddress) public payable {
    require(isAdmin[msg.sender], "Non admin access revoked");
    isAdmin[walletAddress] = false;
  }

  function registerStatus() public view returns (bool) {
    return isRegistered[msg.sender];
  }

  function editRegNo(
    string memory newRegNo,
    address walletAddress
  ) public payable {
    members[Id[walletAddress]].regNo = newRegNo;
  }

  function addMember(string memory name, string memory regNo) public payable {
    require(!isRegistered[msg.sender], "User already registered");
    isRegistered[msg.sender] = true;
    Id[msg.sender] = length;
    length += 1;
    registeredAddresses.push(msg.sender);
    members.push(
      Member(name, regNo, 0, true, false, "member", msg.sender, 0, false)
    );

    regNoOf[msg.sender] = regNo;
  }

  function terminateUser(address walletAddress) public payable {
    require(isAdmin[msg.sender], "Non-admin access denied");
    members[Id[walletAddress]].activated = false;
  }

  function setCoordinator(
    address walletAddress,
    string memory department
  ) public payable {
    require(isAdmin[msg.sender], "Non admin access denied");
    members[Id[walletAddress]].coordinator = true;
    members[Id[walletAddress]].role = department;
  }

  function revertCoordinator(address walletAddress) public payable {
    require(isAdmin[msg.sender], "Non admin access denied");
    members[Id[walletAddress]].coordinator = false;
  }

  function deleteUser(address walletAddress) public payable {
    require(isAdmin[msg.sender], "Non-admin access denied");
    require(isRegistered[walletAddress], "Registered users only");
    members[Id[walletAddress]].activated = false;
    isRegistered[walletAddress] = false;

    regNoOf[walletAddress] = "";
  }

  function getMemberDetails(
    string memory regNo
  ) public view returns (Member memory data) {
    for (uint256 i = 0; i < members.length; i++) {
      if (
        keccak256(abi.encodePacked(members[i].regNo)) ==
        keccak256(abi.encodePacked(regNo))
      ) {
        return members[i];
      }
    }
  }

  function addPoints(address walletAddress, uint256 addVal) public payable {
    require(isAdmin[msg.sender], "Non-admin access denied");
    members[Id[walletAddress]].point += addVal;
    members[Id[walletAddress]].claimableTokens += addVal;
  }

  function minusPoints(address walletAddress, uint256 minVal) public payable {
    require(isAdmin[msg.sender], "Non-admin access denied");
    members[Id[walletAddress]].point -= minVal;
  }

  function pointsToToken(uint256 val) public payable {
    require(isRegistered[msg.sender], "Not registered");
    require(members[Id[msg.sender]].point > 0, "Not enough Points");
    require(
      val <= members[Id[msg.sender]].claimableTokens,
      "Not enough Points"
    );
    members[Id[msg.sender]].claimableTokens -= val;
    flag = true;
    transferFrom(Owner, msg.sender, val * 10 ** 18);
    flag = false;
  }

  function approveTx(address member_approval, uint256 val) public onlyOwner {
    require(isRegistered[member_approval], "Not registered");
    approve(member_approval, val * 10 ** 18);
  }

  function transferFrom(
    address from,
    address to,
    uint256 val
  ) public virtual override returns (bool) {
    require(flag == true, "Wrong Call");
    address spender = _msgSender();
    _spendAllowance(from, spender, val);
    _transfer(from, to, val);
    return true;
  }

  function addTask(
    string memory taskName,
    string memory taskDesc,
    uint256 points
  ) public {
    require(
      isAdmin[msg.sender] == true ||
        members[Id[msg.sender]].coordinator == true,
      "Only admin can call this function"
    );
    taskArray.push(
      Task(taskCount, taskName, taskDesc, points, true, 0, msg.sender,block.timestamp)
    );
    taskCount++;
  }

  function registerForTask(uint256 taskId, string memory comments) external {
    require(isRegistered[msg.sender], "Not registered member");
    taskRegistrations[msg.sender] = taskId;
    taskArray[taskId].count += 1;
    taskEligible[taskId][msg.sender] = true;
    taskComments[taskId][msg.sender] = comments;
  }

  function deleteTask(uint256 taskId) public {
    require(isAdmin[msg.sender] == true, "Only admin can call this function");
    delete taskArray[taskId];
  }

  function closeTask(uint256 taskId) public {
    require(isAdmin[msg.sender] == true, "Only admin can call this function");
    require(taskArray[taskId].status == true, "its already closed");
    taskArray[taskId].status = false;
  }

  function reopenTask(uint256 taskId) public {
    require(isAdmin[msg.sender] == true, "Only admin can call this function");
    require(taskArray[taskId].status == false, "its already open");
    taskArray[taskId].status = true;
  }

  function taskCompleted(uint256 taskId) public {
    require(taskEligible[taskId][msg.sender], "User not registered for task");
    require(isRegistered[msg.sender] == true, "Not a registered member");
    require(taskArray[taskId].status == true, "Task invalid");
    taskDone[taskId][msg.sender] = true;
  }

  function undoTaskCompleted(uint256 taskId) public {
    require(taskEligible[taskId][msg.sender], "User not registered for task");
    require(isRegistered[msg.sender] == true, "Not registered");
    require(taskArray[taskId].status == true, "Task invalid");
    taskDone[taskId][msg.sender] = false;
  }

  function istaskCompleted(
    uint256 taskId,
    address walletAddress
  ) public returns (bool) {
    require(isAdmin[msg.sender] == true, "Only admin can call this function");
    if (taskDone[taskId][walletAddress] = true) {
      return true;
    } else {
      return false;
    }
  }

  function taskAdmin(uint256 taskId, address walletAddress) public {
    require(isAdmin[msg.sender] == true, "Only admin can call this function");
    require(taskDone[taskId][walletAddress] == true);
    taskDone[taskId][walletAddress] = false;
  }
}
