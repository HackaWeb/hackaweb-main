"use client";

import { useRef, useState } from "react";
import { SelectOption } from "@/types/selectOption.interface";
import { SelectProps } from "./Select.props";
import { cn } from "@/helpers/cn";
import { onOutsideClick } from "@/helpers/onOutsideClick";
import { Variants, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const selectVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export const Select = ({
    options,
    activeOption,
    setActiveOption,
    id,
    className,
    placeholder,
    onChange,
}: SelectProps) => {
    const selectRef = useRef<HTMLDivElement>(null);

    const [isOptionsOpened, setIsOptionsOpened] = useState(false);

    const onSelectOptionClick = (option: SelectOption) => {
        setActiveOption(option);
        setIsOptionsOpened(false);
        onChange && onChange(option);
    };

    onOutsideClick(selectRef, () => {
        setIsOptionsOpened(false);
    });

    return (
        <div
            className={cn("relative w-full", className)}
            id={id}
            ref={selectRef}
        >
            <button
                onClick={() => {
                    setIsOptionsOpened(!isOptionsOpened);
                }}
                type="button"
                className="w-full flex justify-between items-center px-4 py-3 bg-secondary text-primary rounded-md focus:outline-none"
            >
                {activeOption ? (
                    activeOption.title
                ) : (
                    <span className="text-primary">{placeholder}</span>
                )}
                <IoIosArrowDown
                    className="text-primary transition-transform"
                    style={{
                        transform: isOptionsOpened
                            ? "rotate(180deg)"
                            : "rotate(0)",
                    }}
                />
            </button>
            {isOptionsOpened && (
                <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={selectVariants}
                    className="absolute left-0 top-full mt-1 w-full bg-modalBg text-primary rounded-md shadow-lg z-10 overflow-hidden"
                    transition={{
                        transition: {
                            type: "tween",
                            duration: 0.2,
                        },
                    }}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => onSelectOptionClick(option)}
                            className="px-4 py-3 cursor-pointer hover:bg-secondary-light transition-colors"
                        >
                            {option.title}
                        </li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
};
