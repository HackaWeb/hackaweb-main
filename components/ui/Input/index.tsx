import { cn } from "@/lib/utils";
import { InputProps } from "./Input.props";

export const Input = ({ className, disabled, ...props }: InputProps) => {
    return (
        <input
            className={cn(
                "mt-2 w-full p-3 text-base bg-secondary rounded-md text-primary placeholder:text-gray-dark",
                disabled && "cursor-not-allowed text-primary text-opacity-60",
                className,
            )}
            {...props}
        />
    );
};
