import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import daologo from "../Logo.png";

function AdminNav() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    }
    return (
        <div className='admincontrols flex flex-col gap-4 items-start bg-sky-800 p-4 justify-start w-fit rounded-xl'>
            <div onClick={goToHome} style={{ cursor: "pointer" }}>
                <img className='w-10' src={daologo} alt="" />
            </div>
            <Link to='/admin/member' style={{ width: '' }}>
                <button className="active:bg-slate-400  p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 transition-all ease-in-out hover:scale-105">Member Functions</button>
            </Link>
            <Link to='/admin/coordinator' style={{ display: 'inline-block' }}>
                <button className="p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Coordinator Functions</button>
            </Link>
            <Link to='/admin/misc' style={{ display: 'block' }}>
                <button className="p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Misc Functions</button>
            </Link>
            <Link to='/admin/tasks' style={{ display: 'block' }}>
                <button className="p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Task Functions</button>
            </Link>

        </div>
    )
}

export default AdminNav