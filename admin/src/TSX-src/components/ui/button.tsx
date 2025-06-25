import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[0.8203rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[1.25rem] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 
          "bg-[#2A3B5B] text-[#F5F7FD] hover:bg-[#2A3B5B]/90 dark:bg-[#F5F7FD] dark:text-[#2A3B5B] dark:hover:bg-[#F5F7FD]/90",
        destructive: 
          "bg-[#EB5757] text-[#F5F7FD] hover:bg-[#EB5757]/90 dark:bg-[#832E31] dark:text-[#F5F7FD] dark:hover:bg-[#832E31]/90",
        outline: 
          "border border-[#DCE4F2] bg-[#FFFFFF] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:bg-[#0F172A] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]",
        secondary: 
          "bg-[#F4F6FB] text-[#2A3B5B] hover:bg-[#F4F6FB]/80 dark:bg-[#3F4856] dark:text-[#F5F7FD] dark:hover:bg-[#3F4856]/80",
        ghost: 
          "hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]",
        link: 
          "text-[#2A3B5B] underline-offset-4 hover:underline dark:text-[#F5F7FD]",
      },
      size: {
        default: "h-[2.3438rem] px-[0.9375rem] py-[0.4688rem]",
        sm: "h-[2.1094rem] rounded-md px-[0.7031rem]",
        lg: "h-[2.5781rem] rounded-md px-[1.875rem]",
        icon: "h-[2.3438rem] w-[2.3438rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }