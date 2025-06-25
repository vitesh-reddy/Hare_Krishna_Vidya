import * as React from "react"

import { cn } from "../../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[2.5rem] w-full rounded-[0.375rem] border border-[#DCE4F2] bg-[#FFFFFF] px-[0.75rem] py-[0.5rem] text-[1rem] ring-offset-[#FFFFFF] file:border-0 file:bg-transparent file:text-[0.875rem] file:font-medium file:text-[#1F2937] placeholder:text-[#6B7280] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A3B5B] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-[0.875rem] dark:border-[#3F4856] dark:bg-[#0F172A] dark:ring-offset-[#0F172A] dark:file:text-[#F5F7FD] dark:placeholder:text-[#9CA3AF] dark:focus-visible:ring-[#F5F7FD]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }