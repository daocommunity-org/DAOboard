import React, { useContext, useState } from 'react'
import { AppConfig } from '../context/AppConfig';

function AddTask() {
    const { addTask } = useContext(AppConfig);
    const [taskName, setTaskName] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const [points, setPoints] = useState("")

    const callAddTask = async (taskName, taskDesc, points) => {
        await addTask(taskName, taskDesc, points)
    }

    return (
        <div className='flex flex-col gap-6 justify-center items-center w-[34rem]'>
            <div className='registrationName flex items-center flex-col gap-6 w-full'>
                <div className='registrationName flex items-center flex-col gap-3 w-full' >
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Task Title</p>
                    <input onChange={e => setTaskName(e.target.value)} className='rounded-lg p-2' type="text" />
                </div>

                <div className='registrationName flex items-center flex-col gap-3 w-full'>
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Task Description</p>
                    <input onChange={e => setTaskDesc(e.target.value)} className='rounded-lg p-2 w-full h-16' type="text" />
                </div>
                <div className='registrationName flex items-center justify-center flex-row gap-3 w-full'>
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Points</p>
                    <input onChange={e => setPoints(e.target.value)} className='rounded-lg p-2 w-12' type="text" />
                </div>

                <button onClick={() => callAddTask(taskName, taskDesc, parseInt(points))} className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Add Task</button>
            </div>
        </div>
    )
}

export default AddTask