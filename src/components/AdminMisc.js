import React from 'react'
import AdminNav from './AdminNav'

function AdminMisc() {
    return (
        <div className='bg-sky-900 h-screen flex justify-start gap-10 '>
            <AdminNav />
            <div className='border-2 border-blue-200 rounded-xl m-auto p-10 flex gap-8  w-3/4 h-[90%]'>
                <button className="w-fit h-fit  p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Top Contributors</button>
                <button className="w-fit h-fit  p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Admin Status</button>

            </div>
        </div>
    )
}

export default AdminMisc