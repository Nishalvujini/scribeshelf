import * as React from "react";
import { cn } from "@/lib/utils";
import { layout } from "@/lib/theme";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "container",
        layout.pageMaxWidth,
        "px-4 sm:px-6",
        className
      )}
      {...props}
    />
  );
}

