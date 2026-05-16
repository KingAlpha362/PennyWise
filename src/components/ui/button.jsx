import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-text text-bg hover:opacity-90",
        destructive:
          "bg-red-500 text-white hover:opacity-90",
        outline:
          "border border-border bg-transparent hover:border-accent hover:bg-[rgba(201,185,154,0.05)] hover:text-text",
        secondary:
          "bg-card text-text hover:bg-[rgba(255,255,255,0.08)]",
        ghost: "hover:bg-[rgba(201,185,154,0.05)] hover:border-accent border border-transparent",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5 rounded-full",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
