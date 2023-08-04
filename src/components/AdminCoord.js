import React, { useContext, useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import RevertCoord from './RevertCoord'
import SetCoordinator from './SetCoordinator'
import { AppConfig } from '../context/AppConfig'
import { useNavigate } from 'react-router-dom'

function AdminCoord() {
    const [statefunctions, setStatefunctions] = useState("")
    const { isadmin } = useContext(AppConfig)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isadmin) {
            navigate("/")
        }
    }, [])
    return (
        <div className='bg-sky-900 h-screen flex justify-start gap-10'>
            <AdminNav />
            <div className='border-2 border-blue-200 rounded-xl m-auto p-10 flex gap-8 flex-col w-[75%] h-[90%]'>
                <div className="flex gap-8">
                    <button className="w-fit h-fit  p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" onClick={e => setStatefunctions("set")}>Set Coordinator</button>
                    <button className="w-fit h-fit  p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" onClick={e => setStatefunctions("revert")}>Revert Coordinator</button>
                </div>
                <div className='renderfunctions w-full flex flex-col m-auto'>
                    {statefunctions === "set" ? <SetCoordinator /> : statefunctions === "revert" ? <RevertCoord /> : ""}
                </div>

            </div>


        </div>
    )
}

export default AdminCoord