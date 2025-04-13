import React from 'react'
import DashboardProvider from './provider'

const DashboardLayout = ({ children}) => {
  return (
    <div>
        <DashboardProvider>
        { children}
        </DashboardProvider>
    </div>
  )
}

export default DashboardLayout