"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  children,
  className,
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    variant === "primary"
      ? "mono-btn-primary"
      : variant === "secondary"
        ? "mono-btn-secondary"
        : "mono-btn-ghost";

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className={cn(base, loading && "opacity-60 pointer-events-none", className)}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
