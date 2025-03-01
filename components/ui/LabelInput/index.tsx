import { cn } from "@/helpers/cn";
import { LabelInputProps } from "./LabelInput.props";
import { Input } from "../Input";

export const LabelInput = ({
    className,
    labelTitle,
    placeholder,
    id,
    value,
    onChange,
    type = "text",
    disabled = false,
}: LabelInputProps) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="text-primary">
                {labelTitle}
            </label>
            <Input
                placeholder={placeholder}
                id={id}
                className={cn(
                    "mt-2 w-full p-3 text-base bg-secondary rounded-md py-4",
                    disabled && "cursor-not-allowed text-gray-400",
                )}
                value={value}
                onChange={onChange}
                type={type}
                disabled={disabled}
            />
        </div>
    );
};
