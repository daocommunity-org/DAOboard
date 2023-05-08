import React, { useState, createContext, useEffect } from "react";
import { SortArray } from "./Utils";
import { ethers } from "ethers";
import contr from "../../src/contract/src/artifacts/contracts/DAOboard.sol/DAOboard.json";
export const AppConfig = createContext();

export const AppProvider = ({ children }) => {
  const [providerConnected, setproviderConnected] = useState(false);
  const [membersdata, setmembersdata] = useState([]);
  const [isadmin, setisAdmin] = useState(false);
  const [currentUser, setcurrentUser] = useState();
  const [tasks, setTasks] = useState([]);
  const [taskLoader, setTaskLoader] = useState(false);

  const contractAddress = "0xffC0F868BaBaCd728476741f40f2bC9742aa4212";
  const ABI = contr.abi;

  let signedContract;

  const requestAccount = async () => {
    const accns = await window.ethereum.request({
      method: "eth_requestAccounts",
    }); // prompt the user to connect one of their metamask accounts if they haven't  already connected
    setproviderConnected(true);
    setcurrentUser(accns[0]);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const newsignedContract = new ethers.Contract(
        contractAddress,
        ABI,
        signer
      );
      signedContract = newsignedContract;
      console.log("connected");
      await adminStatus();
      return true;
    } else {
      return false;
    }
  };

  const addMemberR = async (name, regNo) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.addMember(name, regNo);
  };

  const editRegNo = async (newregno) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.editRegNo(newregno);
  };

  const pointsToToken = async (val) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.pointsToToken(val);
  };

  const terminateUser = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.terminateUser(address);
  };

  const deleteUser = async (walletAddress) => {
    await signedContract.deleteUser(walletAddress);
  };

  const setCoordinator = async (walletAddress, role) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.setCoordinator(walletAddress, role);
  };

  const revertCoordinator = async (walletAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.revertCoordinator(walletAddress);
  };

  const addTask = async (taskName, taskDesc, points) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.addTask(taskName, taskDesc, points);
  };

  const addPoints = async (walletAddress, addVal) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.addPoints(walletAddress, addVal);
  };

  const minusPoints = async (walletAddress, addVal) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.minusPoints(walletAddress, addVal);
  };

  const approveTokens = async (walletAddress, tokens) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.approveTx(walletAddress, tokens);
  };

  const makeAdmin = async (walletAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.makeAdmin(walletAddress);
  };

  const adminStatus = async () => {
    setisAdmin(await signedContract.AdminStatus());
  };

  const registerForTask = async (taskId, comment) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.registerForTask(taskId, comment);
  };

  const returnComments = async (taskId, address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    const comment = await newsignedContract.returnTaskComments(taskId, address);
    return comment;
  };

  const returnTaskDone = async (taskId, address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    const taskDone = await newsignedContract.returnTaskDone(taskId, address);
    return taskDone;
  };

  const getVolunteerList = async (taskId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    let volList = [];
    let k = 0;
    for (let i = 0; i < membersdata.length; i++) {
      let temp = membersdata[i];
      let address = temp.walletAddress;
      console.log(address);
      let id = await newsignedContract.taskRegistrations(address);
      if (parseInt(id._hex) === taskId) {
        console.log("first");
        let isDone = await returnTaskDone(parseInt(id._hex), address);
        volList[k] = [temp.name, temp.walletAddress, isDone];
        k++;
      }
    }
    console.log(volList);
    return volList;
  };

  const completeTask = async (taskId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.taskCompleted(taskId);
  };

  const closeTask = async (taskId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.closeTask(taskId);
  };

  const reopenTask = async (taskId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.reopenTask(taskId);
  };

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
      const getData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const providerContract = new ethers.Contract(
          contractAddress,
          ABI,
          provider
        );
        let data = await providerContract.returnData();
        setmembersdata(SortArray(data));
        setTaskLoader(true);
        let tasks = await providerContract.returnTasks();
        setTasks(tasks);
        setTaskLoader(false);
        console.log("data is ", data);
        console.log("tasks are ", tasks);
        console.log(currentUser);
      };
      getData();
    }
  }, []);

  return (
    <AppConfig.Provider
      value={{
        connectWallet,
        addMemberR,
        terminateUser,
        deleteUser,
        signedContract,
        setCoordinator,
        revertCoordinator,
        addPoints,
        minusPoints,
        providerConnected,
        signedContract,
        membersdata,
        isadmin,
        editRegNo,
        approveTokens,
        currentUser,
        pointsToToken,
        addTask,
        tasks,
        taskLoader,
        getVolunteerList,
        registerForTask,
        returnComments,
        returnTaskDone,
        completeTask,
        closeTask,
        reopenTask,
      }}
    >
      {children}
    </AppConfig.Provider>
  );
};
