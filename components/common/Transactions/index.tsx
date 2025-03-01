import { Table } from "@/components/ui/Table";
import React from "react";
import { TransactionsProps } from "./transactions.props";
import { useTranslations } from "next-intl";
import { RiCoinFill } from "react-icons/ri";

const Transactions = ({ transactions }: TransactionsProps) => {
    const t = useTranslations("Profile");

    const transactionData: React.ReactNode[][] = Array.from(
        { length: 20 },
        (_, index) => {
            const type = index % 2 === 0 ? "withdrawal" : "deposit";
            const amount =
                type === "withdrawal" ? (
                    <div className="flex items-center gap-1">
                        <RiCoinFill className="text-red" />
                        <div className="text-red font-semibold">
                            -{Math.floor(Math.random() * 1000) + 500}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-1">
                        <RiCoinFill className="text-purple" />
                        <div className="text-purple font-semibold">
                            +{Math.floor(Math.random() * 1000) + 500}
                        </div>
                    </div>
                );
            const balance = (
                <div className="flex items-center gap-1 text-yellow font-semibold">
                    <RiCoinFill className="size-4" />
                    {Math.floor(Math.random() * 10000) + 5000}
                </div>
            );
            const date = `2025-03-${(index % 30) + 1}`;
            return [
                index + 1,
                type === "withdrawal"
                    ? t("transaction-type-withdrawal")
                    : t("transaction-type-deposit"),
                amount,
                balance,
                date,
            ];
        },
    );

    const headers = ["ID", "Тип", "Сума", "Залишок", "Дата"];

    return (
        <div>
            <div className="bg-secondary-light p-4 rounded-md overflow-hidden">
                <div className="text-primary font-semibold text-lg">
                    {t("transactions-title")}
                </div>
                <Table
                    className="mt-4"
                    headers={headers}
                    data={transactionData}
                />
            </div>
        </div>
    );
};

export default Transactions;
