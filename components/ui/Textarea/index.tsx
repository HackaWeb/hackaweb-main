import { cn } from "@/helpers/cn";
import { TextareaProps } from "./Textarea.props";

export const Textarea = ({ className, ...rest }: TextareaProps) => {
    return (
        <textarea
            className={cn(
                "w-full p-3 text-base font-medium bg-secondary rounded-md min-h-40 placeholder:text-gray text-primary",
                className,
            )}
            {...rest}
        />
    );
};
