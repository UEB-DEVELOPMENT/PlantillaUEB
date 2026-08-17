import Link from "next/link";
import React from "react";
import {
  Alert as UebAlert,
  AlertTitle,
  AlertDescription,
} from "@ueb-development/ui/components/alert";
import {
  CircleCheckBig,
  CircleX,
  TriangleAlert,
  Info,
  type LucideIcon,
} from "lucide-react";

interface AlertProps {
  variant: "success" | "error" | "warning" | "info"; // Alert type
  title: string; // Title of the alert
  message: string; // Message of the alert
  showLink?: boolean; // Whether to show the "Learn More" link
  linkHref?: string; // Link URL
  linkText?: string; // Link text
}

const variantConfig: Record<
  AlertProps["variant"],
  { dsVariant: "success" | "destructive" | "warning" | "info"; Icon: LucideIcon }
> = {
  success: { dsVariant: "success", Icon: CircleCheckBig },
  error: { dsVariant: "destructive", Icon: CircleX },
  warning: { dsVariant: "warning", Icon: TriangleAlert },
  info: { dsVariant: "info", Icon: Info },
};

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  showLink = false,
  linkHref = "#",
  linkText = "Saber más",
}) => {
  const { dsVariant, Icon } = variantConfig[variant];

  return (
    <UebAlert variant={dsVariant}>
      <Icon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {message}
        {showLink && (
          <Link href={linkHref} className="ml-1 font-medium underline">
            {linkText}
          </Link>
        )}
      </AlertDescription>
    </UebAlert>
  );
};

export default Alert;