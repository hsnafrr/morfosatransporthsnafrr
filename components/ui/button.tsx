import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl": variant === "default",
            "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20": variant === "secondary",
            "border border-primary-200 bg-transparent hover:bg-primary-50 text-primary-900": variant === "outline",
            "hover:bg-primary-100 text-primary-900": variant === "ghost",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-lg px-8": size === "lg",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }
