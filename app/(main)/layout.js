import React from 'react'
import DashboardProvider from './provider'

const DashboardLayout = ({ children}) => {
  return (
    <div className='bg-gray-100'>
        <DashboardProvider>
          <div>
          { children }
          </div>
        </DashboardProvider>
    </div>
  )
}

export default DashboardLayout