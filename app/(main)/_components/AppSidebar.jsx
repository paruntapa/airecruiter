"use client"
import React, { use } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Plus, LogOut} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarOptions } from '@/services/Constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/app/provider'

const AppSidebar = () => {
  const path = usePathname()
  const { signOut } = useAuth()
  const { user } = useUser()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Sidebar>
    <SidebarHeader>
        <p className='text-xl font-bold text-center mt-5'>AI Recruiter</p>
        <Button className='w-full mt-5'><Plus/> Create New Interview</Button>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
        {SidebarOptions.map((option, idx) => (
          <SidebarMenuItem key={idx} className='p-1' >
            <SidebarMenuButton asChild className={`p-5 ${path === option.href && 'bg-orange-100'}`}>
                <Link href={option.href}>
                <option.icon />
                <span className={`text-[16px] ${path === option.href ? 'text-primary' : 'text-muted-foreground'}`}>{option.name}</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter>
      <div className='p-4 space-y-2'>
        {user && (
          <div className='flex items-center space-x-2 p-2 bg-gray-50 rounded-lg'>
            <div className='text-sm'>
              <p className='font-medium text-gray-900'>{user.name}</p>
              <p className='text-gray-500 truncate'>{user.email}</p>
            </div>
          </div>
        )}
        <Button 
          variant="outline" 
          className='w-full' 
          onClick={handleSignOut}
        >
          <LogOut className='w-4 h-4 mr-2' />
          Sign Out
        </Button>
      </div>
    </SidebarFooter>
  </Sidebar>
  )
}

export default AppSidebar