"use client";

import { RadioGroupProps } from "./RadioGroup.props";

export const RadioGroup = ({
    options,
    name,
    selectedValue,
    onChange,
}: RadioGroupProps) => {
    return (
        <div className="flex flex-col space-y-2">
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => onChange(option.value)}
                        className="hidden"
                    />
                    <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedValue === option.value
                                ? "border-purple"
                                : "border-gray-dark"
                        }`}
                    >
                        {selectedValue === option.value && (
                            <div className="w-4 h-4 bg-purple rounded-full" />
                        )}
                    </div>
                    <span className="text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    );
};
