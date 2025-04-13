import { ChartBar, LayoutDashboard, Settings, UserIcon } from "lucide-react";

export const SidebarOptions = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'Interviews',
        href: '/interviews',
        icon: ChartBar
    },
    {
        name: 'Candidates',
        href: '/candidates',
        icon: UserIcon,
    },
    {
        name: 'Billing',
        href: '/billing',
        icon: ChartBar,
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
    }
]