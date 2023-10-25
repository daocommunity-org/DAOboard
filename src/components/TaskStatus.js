import React, { useContext, useEffect, useState } from 'react'
import { AppConfig } from '../context/AppConfig';
import { Box, CircularProgress, Modal } from '@mui/material';

function TaskStatus() {
    const { tasks, closeTask, reopenTask, getVolunteerList, returnTaskDone, taskLoader } = useContext(AppConfig);
    const [address, setAddress] = useState("")
    const [taskId, setTaskId] = useState("")
    const [volList, setVolList] = useState([])
    const [isDoneList, setIsDoneList] = useState([])
    const [loader, setLoader] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height: 500,
        bgcolor: 'rgba(52, 154, 186, 0.87)',
        border: '2px solid rgba(54, 156, 153, 0.87)',
        borderRadius: "12px",
        boxShadow: 24,
        p: 4,
        overflowY: 'scroll'
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = async (address, taskId) => {
        console.log(tasks)
        setOpen(true);
        setAddress(address)
        setTaskId(taskId)
        setLoader(true)
        setVolList(await getVolunteerList(taskId))
        setLoader(false)
        console.log(volList)
    }
    const handleClose = () => setOpen(false);

    // useEffect(() => {
    //     setTaskArr(tasks)
    // }, [])

    return (
        <div className='flex flex-col gap-6 justify-center items-center w-11/12 rounded-2xl'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="taskstatusbox">
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>Initiated by - <p className='rounded-xl p-1 bg-slate-300 w-fit'>{address} </p> </div>
                    </div>
                    <div className='flex justify-between my-4'>
                        <button onClick={() => tasks[taskId][4] === false ? alert("already closed, to reopen click on the reopen button") : closeTask(taskId)} className='shadow-md mt-6 py-2 rounded-xl px-2 bg-red-500 active:bg-orange-300'>Close Task</button>
                        <button onClick={() => tasks[taskId][4] === true ? alert("already open, to close click on the close button") : reopenTask(taskId)} className='shadow-md mt-6 py-2 rounded-xl px-2 bg-blue-500 active:bg-blue-100'>Reopen Task</button>
                    </div>
                    <div className='overflow-y-scroll'>
                        {loader ? <Box sx={{ marginTop: '33px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress color='inherit' />
                        </Box> : volList.map((vol) => (
                            <div className='flex justify-between items-center gap-4 my-3'>
                                <p className='font-semibold'>{vol[0]}</p>
                                <p className='font-semibold bg-slate-300 p-1 rounded-xl cursor-pointer transition-all ease-in-out'>{vol[1]}</p>
                                <p className='font-semibold'>{vol[2] ? "Completed" : "Not Completed"}</p>
                            </div>
                        ))}
                    </div>

                </Box>
            </Modal>
            <div className='flex flex-row justify-between w-full mt-3 px-6'>
                <p className='font-bold text-white text-opacity-60'>Task</p>
                <p className='font-bold text-white text-opacity-60 mr-4'>Status</p>
            </div>
            <div className='taskstatus flex items-center flex-col gap-6 w-full overflow-y-scroll py-2 shadow-2xl rounded-3xl px-4 border-b-2 h-[450px]'>
                {taskLoader ? <Box sx={{ marginTop: '33px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color='inherit' />
                </Box> : tasks.map((dat) => (
                    <div className='flex flex-row justify-between w-full my-2 shadow-inner p-3 rounded-xl cursor-pointer transition-all ease-in-out hover:bg-transparent hover:bg-sky-600  hover:border-x-2 hover:border-blue-300'>
                        <p className='font-semibold'>{dat[1]}</p>
                        <div className='flex items-center justify-center gap-3'>
                            <p>{dat[4] ? "Active" : "Closed"}</p>
                            <button onClick={() => handleOpen(dat[6], parseInt(dat[0]._hex))} className='shadow-md rounded-xl px-2 bg-sky-700 active:bg-sky-500'>View</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskStatus
