import React from 'react'

export const Admin = () => {
  return (
    <div className='bg-sky-900 h-screen'>
      <div className='admincontrols flex flex-col gap-4 items-start bg-sky-800 p-4 justify-start w-fit rounded-xl relative top-4 left-8'>
        <button className="active:bg-slate-400 w-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 transition-all ease-in-out hover:scale-105" >Member Functions</button>
        <button className="w-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105" >Coordinator Functions</button>
      </div>
    </div>
  )
}
