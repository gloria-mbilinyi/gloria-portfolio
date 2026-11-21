import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "icon";
  className?: string;
};

const styles = {
  primary: "button-primary",
  secondary: "button-secondary",
  icon: "button-icon",
};

export const Button = forwardRef<
  HTMLButtonElement,
  Props & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({ children, variant = "primary", className, ...props }, ref) {
  return (
    <button ref={ref} className={cn(styles[variant], className)} {...props}>
      {children}
    </button>
  );
});

export function ButtonLink({
  children,
  variant = "primary",
  className,
  ...props
}: Props & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(styles[variant], className)} {...props}>
      {children}
    </a>
  );
}
