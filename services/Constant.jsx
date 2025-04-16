import { BriefcaseBusinessIcon, ChartBar, Code2Icon, LayoutDashboard, PowerIcon, Puzzle, Settings, StretchHorizontalIcon, User2Icon, UserIcon } from "lucide-react";

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

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon,
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon,
    },
    {
        title: 'Problem Solving',
        icon: Puzzle,
    },
    {
        title: 'Leadership',
        icon: StretchHorizontalIcon,
    },
]