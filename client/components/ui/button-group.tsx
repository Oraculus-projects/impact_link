import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          "[&>*:first-child]:rounded-l-md [&>*:first-child]:rounded-r-none",
          "[&>*:last-child]:rounded-r-md [&>*:last-child]:rounded-l-none",
          "[&>*:not(:first-child):not(:last-child)]:rounded-none",
          "[&>*:not(:first-child)]:-ml-px",
          orientation === "vertical" && "[&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:ml-0",
          className
        )}
        role="group"
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }

