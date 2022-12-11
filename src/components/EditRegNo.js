import React from 'react'

function EditRegNo() {
    return (
        <div className='flex flex-col gap-6 justify-center items-center'>
            <div className='registrationName flex items-center flex-col gap-6'>
                <div className='registrationName flex items-center flex-col gap-3' >
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Wallet Address</p>
                    <input className='rounded-lg p-2' type="text" />
                </div>
                <div className='registrationName flex items-center flex-col gap-3 '>
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>New Registration Number</p>
                    <input className='rounded-lg p-2' type="text" />
                </div>
                <button className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Update</button>
            </div>
        </div>
    )
}

export default EditRegNo