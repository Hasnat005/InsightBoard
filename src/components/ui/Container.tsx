import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        // Responsive gutters with a centered max width.
        "mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  );
}
