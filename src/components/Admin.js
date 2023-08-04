import React, { useContext, useEffect } from 'react'
import AdminNav from './AdminNav'
import { useNavigate } from 'react-router-dom'
import { AppConfig } from '../context/AppConfig'

export const Admin = () => {
  const { isadmin } = useContext(AppConfig)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isadmin) {
      navigate("/")
    }
  }, [])
  return (
    <div className='bg-sky-900 h-screen flex justify-start gap-10'>
      <AdminNav />
    </div >
  )
}
