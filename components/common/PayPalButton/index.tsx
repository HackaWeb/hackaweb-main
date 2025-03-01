"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalButtonProps } from "./PayPalButton.props";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { closeModal } from "@/store/slices/openedModal";
import { useTranslations } from "next-intl";

const PayPalButton = ({ amount }: PayPalButtonProps) => {
    const router = useRouter();
    const t_toasts = useTranslations("Toasts");

    const dispatch = useAppDispatch();

    const closeModalHandler = () => {
        dispatch(closeModal());
    };

    const createOrder = async () => {
        if (!Number(amount)) return toast.error(t_toasts("deposit-error"));

        const response = await fetch("/api/deposit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderAmount: amount }),
        });
        const data = await response.json();
        return data.id;
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                locale: "en_US",
            }}
        >
            <div className="p-4">
                <PayPalButtons
                    createOrder={async () => await createOrder()}
                    onApprove={async (data, actions) => {
                        const order = await actions.order?.capture();
                        toast.success(t_toasts("transaction-success"));
                        router.refresh();
                        closeModalHandler();
                    }}
                    onCancel={() => {
                        router.push("/");
                        toast.error(t_toasts("transaction-canceled"));
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
