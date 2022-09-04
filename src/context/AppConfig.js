import React, {useState, createContext, useEffect } from 'react'
import { SortArray } from './Utils';

export const AppConfig = createContext();

export const AppProvider = ({children}) =>{
    const [providerConnected,setproviderConnected] = useState(false)
    const [signerConnected,setsignerConnected] = useState(false)
    const [dataLoading,setDataLoading] = useState(true)
    const [mmebersdata,setmembersdata] = useState([]);
    const [isadmin,setisAdmin] =useState(false);
    const [userDetails,setuserdetails] = useState([])
    const [fetchedUserDetails,setFetchedUserDetails] = useState([]);
    const [isRegistered,setisregistered] = useState(false);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
   
    const [signedContract,setsignedContract] = useState()
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const ABI = {};
    const providerContract = new ethers.Contract(contractAddress,ABI,provider)
      const connectWallet = async() =>{
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, ABI, signer);
        setsignedContract(newsignedContract);
      } 
      const addMember = async(name,regNo) =>{
        await signedContract.addMember(name,regNo);
      }

      const editRegNo = (newregno) =>{
        await signedContract.editRegNo(newregno);
      }
      

      const terminateUser = async(address) =>{
        await signedContract.terminateUser(address);
      }
      const deleteUser=async(walletAddress) =>{
        await signedContract.deleteUser(walletAddress);
      }

      const setCoordinator = async(walletAddress) =>{
        await signedContract.setCoordinator(walletAddress);
      }
      const revertCoordinator = async(walletAddress) =>{
        await signedContract.revertCoordinator(walletAddress);
      }

      const getMemberDetails = async(walletAddress) =>{
        let tmp = await signedContract.getMemberDetails(walletAddress);
        setFetchedUserDetails(tmp);
      }
      const addPoints = async(walletAddress,addVal) =>{
         await signedContract.addPoints(walletAddress,addVal);
        
      }
      const minusPoints = async(walletAddress,addVal) =>{
        await signedContract.minusPoints(walletAddress,addVal);
       
     }

      useEffect(()=>{
        const requestAccounts = async () => {
            await provider.send("eth_requestAccounts", []);
            setproviderConnected(true)
          }
          const getData = async() =>{
            let data = await providerContract.returnData();
            setmembersdata(SortArray(data));
            
            let stat = await providerContract.AdminStatus();
            setisAdmin(stat);
            stat = await providerContract.registerStatus();
            setisregistered(stat);
            setDataLoading(false);
          }

       requestAccounts()
          .catch(console.error)
          getData()
          .catch(console.error)

         
      },[])

    return (
        <AppConfig.Provider value = {{connectWallet,addMember,terminateUser,deleteUser,
            setCoordinator,revertCoordinator,getMemberDetails,addPoints,minusPoints }}>{children}</AppConfig.Provider>
    )
}