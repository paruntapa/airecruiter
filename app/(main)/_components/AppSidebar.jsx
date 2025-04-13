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
import { Plus} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarOptions } from '@/services/Constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AppSidebar = () => {

  const path = usePathname()

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
    <SidebarFooter />
  </Sidebar>
  )
}

export default AppSidebar