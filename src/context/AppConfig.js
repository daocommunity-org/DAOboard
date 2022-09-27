import React, { useState, createContext, useEffect } from 'react'
import { SortArray } from './Utils';
import { ethers } from "ethers";
import contr from '../../src/contract/src/artifacts/contracts/Lock.sol/Storage.json'
export const AppConfig = createContext();

export const AppProvider = ({ children }) => {
  const [providerConnected, setproviderConnected] = useState(false)
  const [signerConnected, setsignerConnected] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [membersdata, setmembersdata] = useState([]);
  const [isadmin, setisAdmin] = useState(false);
  const [userDetails, setuserdetails] = useState([])
  const [fetchedUserDetails, setFetchedUserDetails] = useState([]);
  const [isRegistered, setisregistered] = useState(false);



  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const [signedContract, setsignedContract] = useState()

  const contractAddress = '0xCc020E9722816Ea317E78A53a9AC95c144c2cCCb'
  const ABI = contr.abi;
  const providerContract = new ethers.Contract(contractAddress, ABI, provider)
  let signedContract;
  async function requestAccount() {
    const accns = await window.ethereum.request({ method: "eth_requestAccounts" }); // prompt the user to connect one of their metamask accounts if they haven't  already connected
    setproviderConnected(true);

  }

  const connectWallet = async () => {
    await requestAccount();
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    // setsignedContract(newsignedContract);
    signedContract = newsignedContract;
    console.log("connected")
    // console.log(newsignedContract)
    await adminStatus();
    // setisAdmin(await newsignedContract.AdminStatus())
  }
  const addMemberR = async (name, regNo) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.addMember(name, regNo);
  }

  const editRegNo = async (newregno) => {
    await signedContract.editRegNo(newregno);
  }

  const terminateUser = async (address) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.terminateUser(address);
  }
  const deleteUser = async (walletAddress) => {
    await signedContract.deleteUser(walletAddress);
  }

  const setCoordinator = async (walletAddress) => {
    await signedContract.setCoordinator(walletAddress);
  }
  const revertCoordinator = async (walletAddress) => {
    await signedContract.revertCoordinator(walletAddress);
  }

  // const getMemberDetails = async (walletAddress) => {
  //   let tmp = await signedContract.getMemberDetails(walletAddress);
  //   setFetchedUserDetails(tmp);
  // }
  const addPoints = async (walletAddress, addVal) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.addPoints(walletAddress, addVal);
  }
  const minusPoints = async (walletAddress, addVal) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.minusPoints(walletAddress, addVal);
  }

  const makeAdmin = async (walletAddress) => {
    const signer = provider.getSigner();
    const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
    await newsignedContract.makeAdmin(walletAddress);
  }

  const adminStatus = async () => {
    setisAdmin(await signedContract.AdminStatus());
  }

  useEffect(() => {
    const addMemberR = async (name, regNo) => {
      await signedContract.addMember(name, regNo);
    }
    const getData = async () => {
      let data = await providerContract.returnData();
      setmembersdata(SortArray(data));
      // let stat = await providerContract.AdminStatus();
      // setisAdmin(stat);
      // stat = await providerContract.registerStatus();
      // setisregistered(stat);
      console.log("data is ", data);
    }
    getData();
  }, [])

  return (
    <AppConfig.Provider value={{
      connectWallet, addMemberR, terminateUser, deleteUser, signedContract,
      setCoordinator, revertCoordinator, addPoints, minusPoints, providerConnected, signedContract, membersdata, isadmin
    }}>{children}</AppConfig.Provider>
  )
}