import React, { useContext, useEffect, useState } from 'react'
import { AppConfig } from '../context/AppConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

function UserTask() {
    const { returnComments, returnTaskDone, tasks, completeTask, currentUser } = useContext(AppConfig);
    const params = useParams();
    const [comment, setComment] = useState("")
    const [taskStatus, setTaskStatus] = useState(false)
    const [task, setTask] = useState([])
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate();

    console.log(params.address, params.taskId)

    useEffect(() => {
        if (currentUser.toLowerCase() === params.address.toLowerCase()) {
            const getComments = async () => {
                setLoader(true)
                setComment(await returnComments(params.taskId, params.address))
                setTaskStatus(await returnTaskDone(params.taskId, params.address))
                setTask(tasks[params.taskId])
                setLoader(false)
            }
            getComments()

        } else {
            navigate('/')
            alert("Please connect your wallet to access the leaderboard")
        }
    }, [])

    const handleTaskCompletion = async (taskId) => {
        if (currentUser.toLowerCase() === params.address.toLowerCase()) {
            await completeTask(taskId)
        }
    }
    console.log(params.taskId)

    console.log(comment)
    console.log(taskStatus)
    console.log(task)
    return (
        <div className='taskStatus'>
            <div className="flex flex-col gap-12 m-16">
                <div className="flex justify-between items-center">
                    <p className='font-extrabold text-4xl w-fit bg-green-50 p-2 rounded-xl min-w-[140px]'>{loader === true ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress color='inherit' />
                    </Box> : task[1]}</p>
                    <div className='flex items-center justify-center gap-1 font-medium'>Posted By - <p className='bg-slate-400 p-2 rounded-lg'>{loader === true ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress color='inherit' />
                    </Box> : task[6]}</p></div>

                </div>
                <p className='font-semibold text-xl ml-6 shadow-xl w-fit p-4'>{loader === true ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color='inherit' />
                </Box> : task[2]}</p>
                <div className='flex flex-col gap-3 shadow-sm'>
                    <p className='font-bold p-2 bg-zinc-400 rounded-xl w-fit ml-2'>Your comment</p>
                    <p className='font-medium text-xl ml-4 p-3 w-fit'>{comment}</p>
                </div>
                <div className="completeTask flex gap-4 w-full">
                    <button disabled={taskStatus} onClick={() => handleTaskCompletion(params.taskId)} className={`w-fit p-2 bg-blue-500 rounded-xl border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out ${!taskStatus ? "hover:scale-105 hover:bg-green-300 cursor-pointer" : ""} `}>{taskStatus === true ? "Completed" : "Complete Task"}</button>
                    <input className='w-3/5 rounded-xl p-3' placeholder='Submit Proof of Completion' type="text" />
                </div>
            </div>
        </div>
    )
}

export default UserTask