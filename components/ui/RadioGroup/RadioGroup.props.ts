import { RadioOption } from "@/types/radioOptions.interface";

export interface RadioGroupProps {
    options: RadioOption[];
    name: string;
    selectedValue: string;
    onChange: (value: string) => void;
};
