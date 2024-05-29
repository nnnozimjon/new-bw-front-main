import { cn } from "@/utils/cn"

interface IProps {
    className?: string 
}

export default function Logo ({ className }: IProps) {
    return <a className={cn("font-bold text-[#2a5ffe] text-[1.35rem] no-underline shrink-0 flex-0 flex-nowrap", className)} href="/">Чистая линия</a>
}