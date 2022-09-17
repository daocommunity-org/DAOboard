import React from 'react'

function AddMember() {
  return (
    <div className='flex flex-col gap-6 justify-center items-center'>
      <div className='registrationName flex items-center'>
        <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Name</p>
        <input className='rounded-lg p-2' type="text" />
      </div>
      <div className='registrationRegNo flex items-center '>
        <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Register Number</p>
        <input className='rounded-lg p-2' type="text" />
      </div>
      <button className="w-fit h-fit p-2 bg-slate-500 rounded-xl border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Add</button>
    </div>
  )
}

export default AddMember