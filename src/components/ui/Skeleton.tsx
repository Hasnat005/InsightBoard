import { clsx } from "clsx";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: "sm" | "md" | "lg" | "full";
};

const rounding: Record<NonNullable<SkeletonProps["rounded"]>, string> = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-2xl",
  full: "rounded-full",
};

export function Skeleton({ className, rounded = "md", ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-slate-100",
        rounding[rounded],
        className
      )}
      {...props}
    />
  );
}
