import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        outline: "text-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        stage1: "border-transparent bg-primary/20 text-primary",
        stage2: "border-transparent bg-blue-500/20 text-blue-400",
        stage3: "border-transparent bg-secondary/20 text-secondary",
        stage4: "border-transparent bg-purple-500/20 text-purple-400",
        stage5: "border-transparent bg-success/20 text-success",
        stage6: "border-transparent bg-warning/20 text-warning",
        stage7: "border-transparent bg-destructive/20 text-destructive",
        stage8: "border-transparent bg-primary/20 text-primary",
        stage9: "border-transparent bg-secondary/20 text-secondary",
        stage10: "border-transparent bg-success/20 text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
