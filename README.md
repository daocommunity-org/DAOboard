# DAOBOARD - DECENTRALIZED LEADERBOARD APP by DAO Community VITC

This is a Solidity smart contract that manages a DAOboard, which is essentially a board of directors for a decentralized autonomous organization (DAO). The contract extends another contract called `proToken`, which defines some basic ERC-20 token functionality.


## Code Structure

The `DAOboard` contract has several functions that can be used to interact with the `Member` and `Task` structs. Some of the key functions include:

- `addMember`: adds a new member to the DAO by creating a new `Member` struct and adding it to the `members` array.
- `getMemberDetails`: returns the `Member` struct for a given member, based on their registration number.
- `addPoints`: adds a specified number of points to a member's account.
- `minusPoints`: removes a specified number of points from a member's account.
- `pointsToToken`: converts a specified number of points to tokens, which can be claimed by the member.
- `setCoordinator`: assigns a member to be a coordinator for a specific department.
- `revertCoordinator`: removes a member's coordinator status.
- `registerStatus`: checks whether the sender is registered as a member of the DAO.
- `isAdmin`: checks whether the sender is an admin of the DAO.
- `makeAdmin`: promotes a member to admin status.
- `revokeAdmin`: demotes an admin to member status.
- `deleteUser`: removes a member from the DAO.
- `terminateUser`: deactivates a member's account.
- `returnData`: returns an array of all members in the DAO.
- `returnTasks`: returns an array of all tasks in the DAO.
- `returnTaskDone`: checks whether a member has completed a specific task.
- `returnTaskEligible`: checks whether a member is eligible to complete a specific task.
- `returnTaskComments`: returns any comments that a member has made about a specific task.

The contract also defines several mappings that are used to store information about the DAO's members and tasks, including:

- `regNoOf`: a mapping that maps a member's Ethereum address to their registration number.
- `Id`: a mapping that maps a member's Ethereum address to their index in the `members` array.
- `isAdmin`: a mapping that maps a member's Ethereum address to a boolean value indicating whether they are an admin.
- `isRegistered`: a mapping that maps a member's Ethereum address to a boolean value indicating whether they are registered as a member of the DAO.
- `registeredAddresses`: an array of all Ethereum addresses that are registered as members of the DAO.
- `taskRegistrations`: a mapping that maps a member's Ethereum address to the number of tasks they have registered for.
- `taskDone`: a mapping that maps a task ID and a member's Ethereum address to a boolean value indicating whether the member has completed the task.
- `taskEligible`: a mapping that maps a task ID and a member's Ethereum address to a boolean value indicating whether the member is eligible to complete the task.
- `taskComments`: a mapping that maps a task ID and a member's Ethereum address to any comments that the member has made about the task.

The contract also has a constructor function that sets the sender's Ethereum address as an admin and initializes some other variables. 

Finally, the contract includes several modifiers that can be used to restrict access to certain functions based on a member's admin status or whether they are registered as a member of the DAO.

## Set up local environment

- Fork the repository.
  
  ![image](https://user-images.githubusercontent.com/90605717/236876460-5be8a23f-e743-4789-9662-a28ffdce8c9d.png)
  
- To clone the github repository locally, use the following command.

  ```
  git clone https://github.com/<username>/DAOboard.git
  ```
  
- Install Packages.

  ```
  npm install 
  ```
  or
  ```
  npm i
  ```
  
- Run it locally

  ```
  npm start
  ```
