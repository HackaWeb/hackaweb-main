import { Table } from "@/components/ui/Table";
import React from "react";
import { TransactionsProps } from "./transactions.props";
import { useTranslations } from "next-intl";
import { formatDateTime } from "@/helpers/formatDate";

const Transactions = ({ transactions }: TransactionsProps) => {
    const t = useTranslations("Profile");

    const transactionData: React.ReactNode[][] = Array.from(
        { length: transactions.length },
        (_, index) => {
            const type = transactions[index].type
                ? t("transaction-type-withdrawal")
                : t("transaction-type-deposit");
            const amount = transactions[index].amount;
            const balance = transactions[index].balance;
            const date = formatDateTime(
                new Date(transactions[index].transactionDate),
            );
            return [index + 1, type, amount, balance, date];
        },
    );

    const headers = [
        "ID",
        t("transaction-type"),
        t("transaction-sum"),
        t("transaction-balance"),
        t("transaction-date"),
    ];

    return (
        <div className="mt-5">
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
