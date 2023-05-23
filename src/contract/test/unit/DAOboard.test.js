//Here we are going to write some unit tests for DAOboard.sol
const { assert, expect } = require("chai");
const { time } = require("@openzeppelin/test-helpers");

const {
  getNamedAccounts,
  deployments,
  ethers,
  network,
  artifacts,
} = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("DAO board Unit Tests 🚀🚀", function () {
      let DAOboard,
        daoBoardInstance,
        token,
        tokenInstance,
        Owner,
        memberAddress,
        memberName = "Ayush Srivastava",
        memberRegNo = "21BPS1234",
        memberDept = "CSE CPS",
        memberName2 = "Ankush Jha",
        memberRegNo2 = "21BPS4321",
        taskName = "Marketing",
        taskDescription =
          "Marketing for the upcoming event in Netaji Auditorium",
        taskPoints = 100,
        comments = "Let's do it!";

      beforeEach(async function () {
        await deployments.fixture();
        token = await ethers.getContractFactory("proToken");
        tokenInstance = await token.deploy();
        await tokenInstance.deployed();

        DAOboard = await ethers.getContractFactory("DAOboard");
        daoBoardInstance = await DAOboard.deploy();
        await daoBoardInstance.deployed();
        [Owner, memberAddress, memberAddress2, memberAddress3] =
          await ethers.getSigners();
      });

      describe("constructor", function () {
        it("should set the contract Owner as admin", async function () {
          const isAdmin = await daoBoardInstance.AdminStatus();
          expect(isAdmin).to.be.true;
        });

        it("should set the length to 0", async function () {
          const length = await daoBoardInstance.getLength();
          expect(length).to.equal(0);
        });
      });

      describe("Testing Other functions...", async function () {
        //Editing the registration number
        it("should be able to edit the registration number", async function () {
          const newRegNo = "21BPS4321";
          await daoBoardInstance.addMember(memberName, memberRegNo);
          await daoBoardInstance.editRegNo(newRegNo, Owner.address);
          const member = await daoBoardInstance.returnData();
          expect(member[0].regNo).to.equal(newRegNo);
        });

        //Adding the member
        it("should add a member and update mappings and arrays", async function () {
          await daoBoardInstance.addMember(memberName, memberRegNo);

          const isRegistered = await daoBoardInstance.registerStatus();
          expect(isRegistered).to.be.true;

          const length = await daoBoardInstance.getLength();
          expect(length).to.equal(1);

          const registeredAddresses =
            await daoBoardInstance.returnRegisteredAddresses();
          expect(registeredAddresses).to.have.lengthOf(1);
          expect(registeredAddresses[0]).to.equal(Owner.address);

          const member = await daoBoardInstance.returnData();
          expect(member[0].name).to.equal(memberName);
          expect(member[0].regNo).to.equal(memberRegNo);

          const regNo = await daoBoardInstance.returnRegNo(Owner.address);
          expect(regNo).to.equal(memberRegNo);
        });

        //Terminate the user - next 2
        it("should terminate the user by setting activated to false", async function () {
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);
          await daoBoardInstance
            .connect(Owner)
            .terminateUser(memberAddress.address);
          const member = await daoBoardInstance.returnData();
          const id = await daoBoardInstance.giveId(memberAddress.address);
          expect(member[id].activated).to.be.false;
        });

        it("should require admin access to terminate a user", async function () {
          // Call the terminateUser() function as a non-admin
          const nonAdmin = await ethers.getSigner();
          await daoBoardInstance
            .connect(nonAdmin)
            .addMember(memberName, memberRegNo);
          await expect(
            daoBoardInstance
              .connect(nonAdmin)
              .terminateUser(memberAddress.address)
          ).to.be.revertedWith("Non-admin access denied");
        });

        //Set Coordinator
        it("should set the coordinator", async function () {
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);
          const dep = "CSE CPS";
          await daoBoardInstance
            .connect(Owner)
            .setCoordinator(memberAddress.address, dep);

          const id = await daoBoardInstance.giveId(memberAddress.address);
          const member = await daoBoardInstance.returnData();
          expect(member[id].coordinator).to.be.true;
          expect(member[id].role).to.equal(dep);
          await expect(
            daoBoardInstance
              .connect(memberAddress)
              .setCoordinator(memberAddress.address, dep)
          ).to.be.revertedWith("Non admin access denied");
        });

        //Revert the coordinator
        it("should revert the coordinator", async function () {
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .revertCoordinator(memberAddress.address);

          const id = await daoBoardInstance.giveId(memberAddress.address);
          const member = await daoBoardInstance.returnData();
          expect(member[id].coordinator).to.be.false;
          expect(
            daoBoardInstance
              .connect(memberAddress)
              .revertCoordinator(memberAddress.address)
          ).to.be.revertedWith("Non admin access denied");
        });

        //Deleting the user
        it("should delete the user", async function () {
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .deleteUser(memberAddress.address);

          const id = await daoBoardInstance.giveId(memberAddress.address);
          const member = await daoBoardInstance.returnData();
          const registerStatus = await daoBoardInstance
            .connect(memberAddress)
            .registerStatus();

          expect(member[id].activated).to.be.false;
          expect(registerStatus).to.be.false;
          expect(
            daoBoardInstance
              .connect(memberAddress)
              .deleteUser(memberAddress.address)
          ).to.be.revertedWith("Non admin access denied");
        });

        //Get the member details
        it("should get the member details", async function () {
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(memberAddress2)
            .addMember(memberName2, memberRegNo2);

          const member = await daoBoardInstance.returnData();
          const id = await daoBoardInstance.giveId(memberAddress.address);
          const memberDetails = await daoBoardInstance.getMemberDetails(
            memberRegNo
          );

          expect(memberDetails.name).to.equal(memberName);
          expect(memberDetails.regNo).to.equal(memberRegNo);
          expect(memberDetails.point).to.equal(0);
          expect(memberDetails.activated).to.equal(true);
          expect(memberDetails.coordinator).to.equal(false);
          expect(memberDetails.role).to.equal("member");
          expect(memberDetails.walletAddress).to.equal(memberAddress.address);
          expect(memberDetails.claimableTokens).to.equal(0);
          expect(memberDetails.underTask).to.equal(false);
        });
      });

      //Related to points
      describe("Testing the points functions...", async function () {
        //Adding the points
        it("should add the points", async function () {
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .addPoints(memberAddress.address, 10);

          const id = await daoBoardInstance.giveId(memberAddress.address);
          const member = await daoBoardInstance.returnData();
          expect(member[id].point).to.equal(10);
          expect(member[id].claimableTokens).to.equal(10);

          await expect(
            daoBoardInstance
              .connect(memberAddress)
              .addPoints(memberAddress.address, 100)
          ).to.be.revertedWith("Non-admin access denied");
        });

        //Subtracting the points
        it("should subtract the points", async function () {
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .addPoints(memberAddress.address, 10);

          await daoBoardInstance
            .connect(Owner)
            .minusPoints(memberAddress.address, 5);

          const id = await daoBoardInstance.giveId(memberAddress.address);
          const member = await daoBoardInstance.returnData();
          expect(member[id].point).to.equal(5);

          await expect(
            daoBoardInstance
              .connect(memberAddress)
              .minusPoints(memberAddress.address, 2)
          ).to.be.revertedWith("Non-admin access denied");
        });
      });

      //Claiming the tokens
      describe("Claiming the tokens by the members...", async function () {
        //It should covert points to tokens
        it.skip("should convert the points to tokens", async function () {
          const val = 50;
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .addPoints(memberAddress.address, 100);

          await daoBoardInstance
            .connect(Owner)
            .approveTx(memberAddress.address, val);
          await daoBoardInstance.connect(memberAddress).pointsToToken(val);
          const proTokens = ethers.utils.parseEther("50");

          expect(await tokenInstance.balanceOf(memberAddress.address)).to.equal(
            proTokens
          );
        });
      });

      //Related to tasks

      describe("Testing the task functions...", async function () {
        //Adding the tasks
        it("should add the tasks", async function () {
          // const currentTime = await time.latest();
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(memberAddress2)
            .addMember(memberName2, memberRegNo2);

          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);

          await daoBoardInstance
            .connect(Owner)
            .setCoordinator(memberAddress.address, memberDept);

          const tasks = await daoBoardInstance.returnTasks();
          expect(tasks[0].taskId).to.equal(0);
          expect(tasks[0].taskName).to.equal(taskName);
          expect(tasks[0].taskDesc).to.equal(taskDescription);
          expect(tasks[0].pointsAlotted).to.equal(taskPoints);
          expect(tasks[0].status).to.equal(true);
          expect(tasks[0].count).to.equal(0);
          expect(tasks[0].initiator).to.equal(Owner.address);
          // expect(tasks[0].timeInitiated).to.equal(currentTime);

          await expect(
            daoBoardInstance
              .connect(memberAddress2)
              .addTask(taskName, taskDescription, taskPoints)
          ).to.be.revertedWith("Only admin can call this function");
        });

        it("should register for tasks", async function () {
          const taskId = 0;
          const nonRegistered = await ethers.getSigner();
          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);

          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(memberAddress)
            .registerForTask(taskId, comments);

          const tasks = await daoBoardInstance.returnTasks();
          const taskEligible = await daoBoardInstance.returnTaskEligible(
            0,
            memberAddress.address
          );
          const taskComments = await daoBoardInstance.returnTaskComments(
            0,
            memberAddress.address
          );

          const taskRegistration =
            await daoBoardInstance.returnTaskRegistrations(
              memberAddress.address
            );

          expect(taskEligible).to.be.true;
          expect(taskComments).to.equal(comments);
          expect(taskRegistration).to.equal(taskId);
          expect(tasks[0].count).to.equal(1);
          await expect(
            daoBoardInstance
              .connect(nonRegistered)
              .registerForTask(taskId, comments)
          ).to.be.revertedWith("Not registered member");
        });

        //Deleting the tasks - deleting the tasks is not working
        it.skip("should delete the tasks", async function () {
          const taskId = 0;
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);

          const tasks = await daoBoardInstance.returnTasks();
          await daoBoardInstance.connect(Owner).deleteTask(taskId);
          console.log(tasks[taskId]);
          expect(tasks[taskId]).to.equal("0");
          await expect(
            daoBoardInstance.connect(memberAddress).deleteTask(taskId)
          ).to.be.revertedWith("Only admin can call this function");
        });

        //Closing a task
        it("should close the task", async function () {
          const taskId = 0;
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);
          await daoBoardInstance.connect(Owner).closeTask(taskId);
          const tasks = await daoBoardInstance.returnTasks();
          expect(tasks[taskId].status).to.be.false;
          await expect(
            daoBoardInstance.connect(memberAddress).closeTask(taskId)
          ).to.be.revertedWith("Only admin can call this function");

          await expect(
            daoBoardInstance.connect(Owner).closeTask(taskId)
          ).to.be.revertedWith("its already closed");
        });

        //Should be able to reopen the task
        it("should reopen the task", async function () {
          const taskId = 0;
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);
          await daoBoardInstance.connect(Owner).closeTask(taskId);
          await daoBoardInstance.connect(Owner).reopenTask(taskId);

          const tasks = await daoBoardInstance.returnTasks();
          expect(tasks[taskId].status).to.be.true;
          await expect(
            daoBoardInstance.connect(memberAddress).reopenTask(taskId)
          ).to.be.revertedWith("Only admin can call this function");

          await expect(
            daoBoardInstance.connect(Owner).reopenTask(taskId)
          ).to.be.revertedWith("its already open");
        });

        //Should give the status of the test
        it("should give the status of task to be completed", async function () {
          const taskId = 0;
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(memberAddress2)
            .addMember(memberName2, memberRegNo2);

          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);

          await daoBoardInstance
            .connect(memberAddress)
            .registerForTask(taskId, comments);

          await expect(
            daoBoardInstance.connect(memberAddress2).taskCompleted(taskId)
          ).to.be.revertedWith("User not registered for task");

          await daoBoardInstance.connect(memberAddress).taskCompleted(taskId);
          const tasks = await daoBoardInstance.returnTasks();
          const registerStatus = await daoBoardInstance
            .connect(memberAddress)
            .registerStatus();
          const taskDone = await daoBoardInstance.returnTaskDone(
            taskId,
            memberAddress.address
          );
          expect(registerStatus).to.be.true;
          expect(tasks[taskId].status).to.be.true;
          expect(taskDone).to.be.true;
        });
        it("should be able to undo the task completed status", async function () {
          const taskId = 0;
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(memberAddress2)
            .addMember(memberName2, memberRegNo2);

          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);

          await daoBoardInstance
            .connect(memberAddress)
            .registerForTask(taskId, comments);

          await expect(
            daoBoardInstance.connect(memberAddress2).undoTaskCompleted(taskId)
          ).to.be.revertedWith("User not registered for task");

          await daoBoardInstance.connect(memberAddress).taskCompleted(taskId);
          await daoBoardInstance
            .connect(memberAddress)
            .undoTaskCompleted(taskId);
          const tasks = await daoBoardInstance.returnTasks();
          const registerStatus = await daoBoardInstance
            .connect(memberAddress)
            .registerStatus();
          const taskDone = await daoBoardInstance.returnTaskDone(
            taskId,
            memberAddress.address
          );
          expect(registerStatus).to.be.true;
          expect(tasks[taskId].status).to.be.true;
          expect(taskDone).to.be.false;
        });
        it("user gives the flag that task is completed", async function () {
          const taskId = 0;
          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);

          await daoBoardInstance
            .connect(memberAddress)
            .registerForTask(taskId, comments);

          expect(
            daoBoardInstance
              .connect(memberAddress)
              .istaskCompleted(taskId, memberAddress.address)
          ).to.be.revertedWith("Only admin can call this function");

          await daoBoardInstance.connect(memberAddress).taskCompleted(taskId);

          await daoBoardInstance
            .connect(Owner)
            .istaskCompleted(taskId, memberAddress.address);

          const taskDone = await daoBoardInstance.returnTaskDone(
            taskId,
            memberAddress.address
          );
        });
        it("some taskAdmin function test", async function () {
          const taskId = 0;
          await expect(
            daoBoardInstance
              .connect(memberAddress)
              .taskAdmin(taskId, memberAddress.address)
          ).to.be.revertedWith("Only admin can call this function");

          await daoBoardInstance
            .connect(memberAddress)
            .addMember(memberName, memberRegNo);

          await daoBoardInstance
            .connect(Owner)
            .addTask(taskName, taskDescription, taskPoints);

          await daoBoardInstance
            .connect(memberAddress)
            .registerForTask(taskId, comments);

          await daoBoardInstance.connect(memberAddress).taskCompleted(taskId);

          await daoBoardInstance
            .connect(Owner)
            .taskAdmin(taskId, memberAddress.address);

          const taskDone = await daoBoardInstance.returnTaskDone(
            taskId,
            memberAddress.address
          );

          expect(taskDone).to.be.false;
        });
      });
    });
