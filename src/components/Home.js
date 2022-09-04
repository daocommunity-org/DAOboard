import React, { useContext, useState } from 'react'
import { AppConfig } from '../context/AppConfig'

export const Home = () => {
    const {connectWallet} = useContext(AppConfig);

  return (
    <div>
        <button onClick = {connectWallet}>Connect wallet</button>   
    </div>
  )
}
