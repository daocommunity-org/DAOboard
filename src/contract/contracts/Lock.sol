// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.9;
import "./proTokens.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

contract LeaderBoard is proToken {
    address public Owner = msg.sender;
    struct Member {
        string name;
        string regNo;
        uint256 point;
        bool activated;
        bool coordinator;
        address walletAddress;
        uint256 claimableTokens;
        bool underTask;
    }

    struct Task {
        uint256 taskId;
        string taskName;
        uint256 pointsAlotted;
        bool status; // open or close
    }

    Task[] public taskArray;
    uint256 public taskCount;
    mapping(uint256 => address[]) public volunteers;
    mapping(uint256 => mapping(address => bool)) public taskStatus;

    mapping(address => string) regNoOf;
    Member[] public members;
    mapping(address => uint256) Id;
    mapping(address => bool) isAdmin;
    mapping(address => bool) isRegistered;
    address[] registeredAddresses;

    uint256 length;
    bool flag = false;

    constructor() {
        isAdmin[msg.sender] = true;
        length = 0;
    }

    function returnData() public view returns (Member[] memory) {
        //    Member[] calldata datas = members;
        return members;
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
        members.push(Member(name, regNo, 0, true, false, msg.sender, 0, false));

        regNoOf[msg.sender] = regNo;
    }

    function terminateUser(address walletAddress) public payable {
        require(isAdmin[msg.sender], "Non-admin access denied");
        members[Id[walletAddress]].activated = false;
    }

    function setCoordinator(address walletAddress) public payable {
        require(isAdmin[msg.sender], "Non admin access denied");
        members[Id[walletAddress]].coordinator = true;
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

    function addTask(string memory taskName, uint256 points) public {
        require(
            isAdmin[msg.sender] == true,
            "Only admin can call this function"
        );
        taskArray.push(Task(taskCount, taskName, points, true));
        taskCount++;
    }

    function registerForTask(uint256 taskId) external {
        require(
            isRegistered[msg.sender] == true,
            "Not a registered member, Please register yourself into the leaderboard"
        );
        volunteers[taskId].push(members[Id[msg.sender]].walletAddress);
        members[Id[msg.sender]].underTask = true;
    }

    function completeTask(uint256 taskId) external {
        require(
            isRegistered[msg.sender] == true,
            "Not a registered member, Please register yourself into the leaderboard"
        );
        require(
            members[Id[msg.sender]].underTask = true,
            "This member is not working under any task"
        );
        taskStatus[taskId][msg.sender] = true;
        members[Id[msg.sender]].underTask = false;
    }

    // function deleteTask(uint256 taskId) public {
    //     require(
    //         isAdmin[msg.sender] == true,
    //         "Only admin can call this function"
    //     );
    //     delete taskArray[taskId];
    // }

    // function closeTask(uint256 taskId) public {
    //     require(
    //         isAdmin[msg.sender] == true,
    //         "Only admin can call this function"
    //     );
    //     require(taskArray[taskId].status == true, "its already closed");
    //     taskArray[taskId].status = false;
    // }

    // function reopenTask(uint256 taskId) public {
    //     require(
    //         isAdmin[msg.sender] == true,
    //         "Only admin can call this function"
    //     );
    //     require(taskArray[taskId].status == false, "its already open");
    //     taskArray[taskId].status = true;
    // }

    // function taskCompleted(uint256 taskId) public {
    //     require(isRegistered[msg.sender] == true, "Not registered");
    //     require(taskArray[taskId].status == true, "Task invalid");
    //     taskDone[taskId][msg.sender] = true;
    // }

    // function undoTaskCompleted(uint256 taskId) public {
    //     require(isRegistered[msg.sender] == true, "Not registered");
    //     require(taskArray[taskId].status == true, "Task invalid");
    //     taskDone[taskId][msg.sender] = false;
    // }

    // function istaskCompleted(uint256 taskId, address walletAddress)
    //     public
    //     returns (bool)
    // {
    //     require(
    //         isAdmin[msg.sender] == true,
    //         "Only admin can call this function"
    //     );
    //     if (taskDone[taskId][walletAddress] = true) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // function taskAdmin(uint256 taskId, address walletAddress) public {
    //     require(
    //         isAdmin[msg.sender] == true,
    //         "Only admin can call this function"
    //     );
    //     require(taskDone[taskId][walletAddress] == true);
    //     taskDone[taskId][msg.sender] = false;
    // }

    // function checkTaskCompletion(uint256 taskId)
    //     public
    //     view
    //     returns (mapping(address => bool))
    // {
    //     require(
    //         isAdmin[msg.sender] == true,
    //         "Only admin can call this function"
    //     );
    //     return taskDone[taskId];
    // }
}
