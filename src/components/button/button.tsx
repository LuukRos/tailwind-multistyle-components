import { twMerge } from "tailwind-merge";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

type ButtonProps = {
  tone?: "default" | "danger" | "warning" | "success";
  impact?: "bold" | "light" | "bordered";
  shape?: "rounded" | "pill" | "square";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

type ButtonPropsKey = string | undefined;

type LookupObject<T extends ButtonPropsKey, U = string> = Record<
  NonNullable<T>,
  U
>;

const baseClasses =
  "font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:hover:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 active:translate-y-px disabled:active:translate-y-0";

const toneClasses: LookupObject<
  ButtonProps["tone"],
  LookupObject<ButtonProps["impact"]>
> = {
  default: {
    bold: "bg-sky-500 text-white hover:bg-sky-600 focus-visible:ring-sky-500",
    light:
      "bg-sky-200 text-sky-900 hover:bg-sky-300 focus-visible:ring-sky-500",
    bordered:
      "outline outline-2 outline-sky-500 hover:bg-sky-200 focus-visible:ring-sky-500 dark:text-white dark:hover:text-black",
  },
  danger: {
    bold: "bg-rose-400 hover:bg-rose-500 focus-visible:ring-rose-500",
    light:
      "bg-rose-200 text-rose-900 hover:bg-rose-300 focus-visible:ring-rose-500",
    bordered:
      "outline outline-2 outline-rose-500 hover:bg-rose-200 focus-visible:ring-rose-500 dark:text-white dark:hover:text-black",
  },
  warning: {
    bold: "bg-amber-400 hover:bg-amber-500 focus-visible:ring-amber-500",
    light:
      "bg-amber-200 text-amber-900 hover:bg-amber-300 focus-visible:ring-amber-500",
    bordered:
      "outline outline-2 outline-amber-500 hover:bg-amber-200 focus-visible:ring-amber-500 dark:text-white dark:hover:text-black",
  },
  success: {
    bold: "bg-green-400 hover:bg-green-500 focus-visible:ring-green-500",
    light:
      "bg-green-200 text-green-900 hover:bg-green-300 focus-visible:ring-green-500",
    bordered:
      "outline outline-2 outline-green-500 hover:bg-green-200 focus-visible:ring-green-500 dark:text-white dark:hover:text-black",
  },
};

const shapeClasses: LookupObject<ButtonProps["shape"]> = {
  square: "rounded-none",
  rounded: "rounded",
  pill: "rounded-full",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "p-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const loadingClasses =
  "flex gap-2 items-center justify-between cursor-progress";

const disabledClasses = "cursor-not-allowed";

export const Button = ({
  size = "md",
  shape = "rounded",
  tone = "default",
  impact = "bold",
  isLoading = false,
  children,
  ...restProps
}: ButtonProps & React.ComponentProps<"button">) => {
  const { className, ...rest } = restProps;

  return (
    <button
      className={twMerge(
        baseClasses,
        shapeClasses[shape],
        sizeClasses[size],
        toneClasses[tone][impact],
        rest.disabled && disabledClasses,
        isLoading && loadingClasses,
        className,
      )}
      {...rest}
    >
      {children}
      {isLoading && <LoadingSpinner />}
    </button>
  );
};
