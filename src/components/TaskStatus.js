import React, { useContext, useEffect, useState } from 'react'
import { AppConfig } from '../context/AppConfig';

function TaskStatus() {
    const { tasks } = useContext(AppConfig);
    const [taskArr, setTaskArr] = useState([])

    useEffect(() => {
        setTaskArr(tasks)
    }, [])

    return (
        <div className='flex flex-col gap-6 justify-center items-center w-[34rem]'>
            <div className='taskstatus flex items-center flex-col gap-6 w-full bg-blue-400'>
                {taskArr.map((dat) => (
                    <p>{dat[1]}</p>
                ))}
            </div>
        </div>
    )
}

export default TaskStatus