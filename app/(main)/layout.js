import React from 'react'
import DashboardProvider from './provider'
import ProtectedRoute from '@/components/ProtectedRoute'

const DashboardLayout = ({ children}) => {
  return (
    <ProtectedRoute>
      <div className='bg-gray-100'>
          <DashboardProvider>
            <div>
            { children }
            </div>
          </DashboardProvider>
      </div>
    </ProtectedRoute>
  )
}

export default DashboardLayout