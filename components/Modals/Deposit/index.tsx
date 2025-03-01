"use client";

import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { motion } from "framer-motion";
import { popAnimationWithTransform, TOKEN_RATE } from "@/constants";
import { LabelInput } from "@/components/ui/LabelInput";
import { useState } from "react";
import PayPalButton from "@/components/common/PayPalButton";

export const Deposit = () => {
    const [amount, setAmount] = useState<number>(0);

    return (
        <motion.div
            {...popAnimationWithTransform}
            className="max-h-[40vh] pt-4 fixed left-[50%] -translate-x-1/2 md:max-w-[700px] w-[95%] md:w-full md:top-10 top-4 z-10 bg-modalBg sm:p-6 flex flex-col rounded-lg bottom-4 text-primary"
        >
            <ReturnBtn className="self-start mt-2 mb-10 ml-2 sm:ml-4" />
            <div className="text-xl sm:text-3xl text-center mt-5">
                Поповнення балансу
            </div>
            <div className="w-full p-4">
                <LabelInput
                    labelTitle="Сума токенів"
                    type="number"
                    placeholder="Введіть суму"
                    id="amount"
                    value={amount.toString()}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                {amount > 0 && (
                    <span className="text-sm text-gray-dark">
                        ≈ {(amount * TOKEN_RATE).toFixed(2)} $
                    </span>
                )}
                <PayPalButton amount={(amount * TOKEN_RATE).toFixed(2)} />
            </div>
        </motion.div>
    );
};
