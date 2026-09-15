"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  rightIconLabel?: string;
};

export function Input({
  label,
  id,
  error,
  leftIcon,
  rightIcon,
  onRightIconClick,
  rightIconLabel,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <label className="block space-y-2" htmlFor={inputId}>
      <span className="text-sm font-medium text-white/90">{label}</span>
      <span className="relative block">
        {leftIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-white/55">
            {leftIcon}
          </span>
        ) : null}
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={[
            "w-full rounded-md border bg-amfah-surface px-3 py-3 text-sm text-white placeholder:text-amfah-muted outline-none transition focus:ring-1",
            error
              ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/40"
              : "border-amfah-border focus:border-amfah-gold/70 focus:ring-amfah-gold/40",
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {rightIcon ? (
          <button
            type="button"
            onClick={onRightIconClick}
            aria-label={rightIconLabel ?? "Toggle field action"}
            className="absolute inset-y-0 right-2 flex items-center rounded px-1 text-white/55 transition hover:text-white"
          >
            {rightIcon}
          </button>
        ) : null}
      </span>
      {error ? (
        <span id={errorId} className="block text-xs text-red-400">
          {error}
        </span>
      ) : null}
    </label>
  );
}
