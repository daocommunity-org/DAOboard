import React from 'react'

function GetMDetails() {
    return (
        <div>
            <div className='flex flex-col gap-6 justify-center items-center'>
                <div className='registrationName flex items-center flex-col gap-6'>
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Registration Number</p>
                    <input className='rounded-lg p-2' type="text" />
                    <button className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Search</button>
                </div>
            </div>
        </div>
    )
}

export default GetMDetails