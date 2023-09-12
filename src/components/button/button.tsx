import { twMerge } from "tailwind-merge";

type ButtonProps = {
  tone?: "default" | "danger" | "warning" | "success";
  impact?: "bold" | "light" | "bordered";
  shape?: "rounded" | "pill" | "square";
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "p-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = ({
  size = "md",
  shape = "rounded",
  tone = "default",
  impact = "bold",
  ...restProps
}: ButtonProps & React.ComponentProps<"button">) => {
  return (
    <button
      className={twMerge(
        "bg-sky-500 px-4 py-3 text-base font-semibold text-white hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:translate-y-px disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:cursor-not-allowed",
        sizeClasses[size],
      )}
      {...restProps}
    />
  );
};
