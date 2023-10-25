import React, { useContext, useEffect, useState } from 'react'
import AddTask from './AddTask'
import AdminNav from './AdminNav'
import TaskStatus from './TaskStatus'
import { AppConfig } from '../context/AppConfig'
import { useNavigate } from 'react-router-dom'

function AdminTasks() {

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
            <div className='border-2 border-blue-200 rounded-xl m-auto p-10 flex flex-col gap-8 w-[75%] h-[90%]'>
                <div className="flex gap-8">
                    <button onClick={() => setStatefunctions("addtask")} className="w-fit h-fit  p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Add Task</button>
                    <button onClick={() => setStatefunctions("taskstatus")} className="w-fit h-fit  p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Task Status</button>
                </div>

                <div className='renderfunctions w-full h-full flex flex-col justify-center items-center'>
                    {statefunctions === "addtask" ? <AddTask /> : statefunctions === "taskstatus" ? <TaskStatus /> : ""}
                </div>
            </div>
        </div>
    )
}

export default AdminTasks