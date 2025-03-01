import { Table } from "@/components/ui/Table";
import React from "react";
import { TransactionsProps } from "./transactions.props";
import { useTranslations } from "next-intl";

const Transactions = ({ transactions }: TransactionsProps) => {
    const t = useTranslations("Profile");

    const transactionData: React.ReactNode[][] = Array.from(
        { length: 20 },
        (_, index) => {
            const type = index % 2 === 0 ? "withdrawal" : "deposit";
            const amount =
                type === "withdrawal"
                    ? Math.floor(Math.random() * 1000) + 100
                    : Math.floor(Math.random() * 1000) + 500;
            const balance = 5000 + index * 100;
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
