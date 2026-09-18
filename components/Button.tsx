import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-amfah-gold-dark via-amfah-gold to-amfah-gold-light text-amfah-black font-semibold tracking-[0.12em] hover:brightness-110 active:brightness-95",
  ghost:
    "bg-transparent text-amfah-muted border border-amfah-border hover:border-amfah-gold hover:text-white",
};

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-md px-4 py-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amfah-gold disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
