import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'

const DashboardProvider = ({ children}) => {
  return (
    <SidebarProvider>
        <AppSidebar/>
        <div>
        <SidebarTrigger />
        { children}
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider