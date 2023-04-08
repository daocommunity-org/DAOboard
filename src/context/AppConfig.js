import React, { useState, createContext, useEffect } from "react";
import { SortArray } from "./Utils";
import { ethers } from "ethers";
import contr from "../../src/contract/src/artifacts/contracts/Lock.sol/LeaderBoard.json";
export const AppConfig = createContext();

export const AppProvider = ({ children }) => {
  const [providerConnected, setproviderConnected] = useState(false);
  const [membersdata, setmembersdata] = useState([]);
  const [isadmin, setisAdmin] = useState(false);
  const [currentUser, setcurrentUser] = useState()
  const [tasks, setTasks] = useState([])
  const [taskLoader, setTaskLoader] = useState(false)

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const [signedContract, setsignedContract] = useState()

  const contractAddress = "0xc880f9c2a8CdD09F93C28ecb517142D89560824D";
  const ABI = contr.abi;
  const providerContract = new ethers.Contract(contractAddress, ABI, provider);


  let signedContract;


  async function requestAccount() {
    const accns = await window.ethereum.request({
      method: "eth_requestAccounts",
    }); // prompt the user to connect one of their metamask accounts if they haven't  already connected
    setproviderConnected(true);
    setcurrentUser(accns[0])
  }

  const connectWallet = async () => {
    await requestAccount();
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    signedContract = newsignedContract;
    console.log("connected");
    await adminStatus();
  };

  const addMemberR = async (name, regNo) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.addMember(name, regNo);
  };

  const editRegNo = async (newregno) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.editRegNo(newregno);
  };

  const pointsToToken = async (val) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.pointsToToken(val);
  }

  const terminateUser = async (address) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.terminateUser(address);
  };
  const deleteUser = async (walletAddress) => {
    await signedContract.deleteUser(walletAddress);
  };

  const setCoordinator = async (walletAddress) => {
    await signedContract.setCoordinator(walletAddress);
  };
  const revertCoordinator = async (walletAddress) => {
    await signedContract.revertCoordinator(walletAddress);
  };

  const addTask = async (taskName, taskDesc, points) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.addTask(taskName, taskDesc, points)
  }

  const addPoints = async (walletAddress, addVal) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.addPoints(walletAddress, addVal);
  };
  const minusPoints = async (walletAddress, addVal) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.minusPoints(walletAddress, addVal);
  };

  const approveTokens = async (walletAddress, tokens) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.approveTx(walletAddress, tokens);
  }

  const makeAdmin = async (walletAddress) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.makeAdmin(walletAddress);
  };

  const adminStatus = async () => {
    setisAdmin(await signedContract.AdminStatus());
  };

  const registerForTask = async (taskId, comment) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.registerForTask(taskId, comment)
  }

  const returnComments = async (taskId, address) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    const comment = await newsignedContract.returnTaskComments(taskId, address)
    return comment
  }

  const returnTaskDone = async (taskId, address) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    const taskDone = await newsignedContract.returnTaskDone(taskId, address)
    return taskDone
  }

  const getVolunteerList = async (taskId) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    let volList = []
    let k = 0
    for (let i = 0; i < membersdata.length; i++) {
      let temp = membersdata[i]
      let address = temp.walletAddress
      console.log(address)
      let id = await newsignedContract.taskRegistrations(address)
      if (parseInt(id._hex) === taskId) {
        console.log("first")
        volList[k] = [temp.name, temp.walletAddress]
        k++
      }
    }
    console.log(volList)
    return volList
  }

  const completeTask = async (taskId) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.taskCompleted(taskId)
  }

  useEffect(() => {
    const getData = async () => {
      let data = await providerContract.returnData();
      setmembersdata(SortArray(data));
      setTaskLoader(true)
      let tasks = await providerContract.returnTasks();
      setTasks(tasks)
      setTaskLoader(false)
      console.log("data is ", data);
      console.log("tasks are ", tasks);
      console.log(currentUser)
    };
    getData();
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
        completeTask
      }}
    >
      {children}
    </AppConfig.Provider>
  );
};
