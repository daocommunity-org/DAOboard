import React, { useContext } from 'react'
import { AppConfig } from '../context/AppConfig';

function LeaderBoard() {
    const { membersdata } = useContext(AppConfig);
    return (
        <div className='bg-sky-900 h-screen flex flex-col items-center justify-center'>
            <div><h1 className='font-bold text-blue-50 text-2xl mb-4'>LeaderBoard - Top Contributors</h1></div>
            <table className='w-[80%] overflow-scroll'>
                <tr className='border-2 border-black'>
                    <th className='border-black text-center border-2'>Name</th>
                    <th className='border-black text-center border-2'>Registration Number</th>
                    <th className='border-black text-center border-2'>Address</th>
                    <th className='border-black text-center border-2'>Points</th>
                    <th className='border-black text-center border-2'>Coordinator</th>
                </tr>
                {membersdata.map((dat) => (
                    dat[3] && <tr className='border-2 border-black'>
                        <td className='border-2 border-black font-mono text-center'>{dat[0]}</td>
                        <td className='border-2 border-black font-mono text-center'>{dat[1]}</td>
                        <td className='border-2 border-black font-mono text-center'>{dat[5]}</td>
                        <td className='border-2 border-black font-mono text-center'>{parseInt(dat[2]._hex, 16)}</td>
                        <td className='border-2 border-black font-mono text-center'>{dat[4] ? "Coordinator" : "Not Coordinator"}</td>
                    </tr>
                ))}

            </table>
        </div>
    )
}

export default LeaderBoard