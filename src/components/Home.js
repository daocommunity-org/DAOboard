import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppConfig } from '../context/AppConfig'
import daologo from "../Logo.png";
import daologo1 from "../logo_type_white.png";

export const Home = () => {
  const { connectWallet } = useContext(AppConfig);
  const { providerConnected, isadmin } = useContext(AppConfig)

  const navigate = useNavigate();

  const adminRedirect = async () => {
    if (isadmin) {
      console.log(true)
      navigate("/admin");
    }
    else {
      console.log(false)
    }
  }


  return (
    <div>
      {/* navbar */}
      <div className='navbar flex gap-4 items-center bg-sky-800 p-4 justify-between'>
        <div className='flex gap-4'>
          <div className='connectwallet'>
            <button disabled={providerConnected} onClick={connectWallet} className={providerConnected ? "w-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200" : "active:bg-slate-400 w-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 transition-all ease-in-out hover:scale-105"}>{providerConnected ? "Connected" : "Connect Wallet"}</button>

          </div>
          <div className='admin self-end'>
            {isadmin ? <button onClick={adminRedirect} className="w-fit p-2 bg-slate-500 rounded-xl active:bg-slate-400 border-2 border-blue-200 transition-all ease-in-out hover:scale-105">Admin Console</button> : <div></div>}
          </div>
        </div>

        <div className='flex self-end'>
          <img className='w-10' src={daologo} alt="" />
        </div>
      </div>

      {/* <button onClick={e => addMember("Gautham", "21BRS1032")}>Add</button> */}
      {/* hero */}
      <div className='hero bg-sky-900 h-screen flex flex-col items-center'>
        <div className="logo mt-6 m-auto flex items-center gap-4 border-2 border-white p-4 rounded-lg flex-wrap mx-2" >
          <img className='w-96' src={daologo1} alt="" />
          <div className='font-bold text-blue-50 text-2xl'>LEADERBOARD</div>
        </div>

        <div className="button m-auto flex gap-10 -mt-10 flex-wrap">
          <div className="viewldboard">
            <button className="w-fit px-6 py-4 bg-slate-500 rounded-xl active:bg-slate-400  hover:bg-sky-100 transition-all ease-in-out hover:scale-105">View Leaderboard</button>
          </div>
          <div className='registerldboard'>
            <Link to="/register">
              <button className="w-fit px-6 py-4 bg-slate-500 rounded-xl active:bg-slate-400  hover:bg-sky-100 transition-all ease-in-out hover:scale-105">Register for Leaderboard</button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}
