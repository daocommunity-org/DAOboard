import React, { useState } from 'react'
import AddPts from './AddPts';
import AdminNav from './AdminNav'
import Approve from './Approve';
import DeductPts from './DeductPts';
import EditRegNo from './EditRegNo';
import GetMDetails from './GetMDetails';
import RoleMember from './RoleMember';
import Terminate from './Terminate.js';

function AdminMember() {
    const [statefunction, setStatefunction] = useState("");
    return (
        <div className='bg-sky-900 h-screen flex justify-start gap-10'>
            <AdminNav />
            <div className='border-2 border-blue-200 rounded-xl p-10 flex flex-col gap-8 m-auto w-[75%] h-[90%]'>
                <div className='flex gap-8'>
                    <button className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" onClick={() => setStatefunction("edit")}>Edit Register No</button>
                    <button className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" onClick={() => setStatefunction("terminate")}>Terminate Member</button>
                    <button className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" onClick={() => setStatefunction("addpoints")}>Add Points</button>
                    <button className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" onClick={() => setStatefunction("deductpts")}>Deduct Points</button>
                    <button className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" onClick={() => setStatefunction("getdetails")}>Get Details</button>
                    <button className="w-fit h-fit  p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" onClick={() => setStatefunction("role")}>Member Activity</button>
                    <button className="w-fit h-fit  p-2 bg-red-500 rounded-xl  border-2 border-red-300 active:bg-red-500 transition-all ease-in-out hover:scale-105" onClick={() => setStatefunction("approve")}>Approve Tokens</button>
                </div>

                <div className='renderfunctions m-auto'>
                    {statefunction === "role" ? <RoleMember /> : statefunction === "edit" ? <EditRegNo /> : statefunction === "getdetails" ? <GetMDetails /> : statefunction === "addpoints" ? <AddPts /> : statefunction === "deductpts" ? <DeductPts /> : statefunction === "terminate" ? <Terminate /> : statefunction === "approve" ? <Approve /> : ""}

                </div>
            </div>
        </div>
    )
}

export default AdminMember