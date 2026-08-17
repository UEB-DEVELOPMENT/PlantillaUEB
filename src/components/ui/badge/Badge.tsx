import React from "react";
import { Badge as UebBadge } from "@ueb-development/ui/components/badge";

type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps {
  variant?: BadgeVariant; // Light or solid variant
  size?: BadgeSize; // Badge size
  color?: BadgeColor; // Badge color
  startIcon?: React.ReactNode; // Icon at the start
  endIcon?: React.ReactNode; // Icon at the end
  children: React.ReactNode; // Badge content
}

const Badge: React.FC<BadgeProps> = ({
  size = "md",
  color = "primary",
  startIcon,
  endIcon,
  children,
}) => {
  const dsVariant = (
    color === "primary"
      ? "default"
      : color === "success"
      ? "success"
      : color === "error"
      ? "destructive"
      : color === "warning"
      ? "warning"
      : color === "info"
      ? "info"
      : "secondary"
  ) as "default" | "secondary" | "destructive" | "success" | "warning" | "info";

  return (
    <UebBadge
      variant={dsVariant}
      className={size === "sm" ? "h-5 rounded-4xl text-xs" : "h-6 rounded-4xl"}
    >
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </UebBadge>
  );
};

export default Badge;