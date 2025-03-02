import { Table } from "@/components/ui/Table";
import React from "react";
import { TransactionsProps } from "./transactions.props";
import { useTranslations } from "next-intl";
import { formatDateTime } from "@/helpers/formatDate";
import { RiCoinFill } from "react-icons/ri";

const Transactions = ({ transactions }: TransactionsProps) => {
    const t = useTranslations("Profile");

    const transactionData: React.ReactNode[][] = transactions.map(
        (transaction, index) => {
            const isWithdrawal = transaction.type;
            const type = isWithdrawal
                ? t("transaction-type-withdrawal")
                : t("transaction-type-deposit");
            const amount = isWithdrawal
                ? `-${transaction.amount}`
                : `+${transaction.amount}`;
            const amountColor = isWithdrawal ? "text-red" : "text-purple";
            const balance = transaction.balance;
            const date = formatDateTime(new Date(transaction.transactionDate));

            return [
                transaction.id,
                <span className={amountColor}>{type}</span>,
                <span className={amountColor}>{amount}</span>,
                <span className="flex items-center gap-1 text-yellow">
                    <RiCoinFill className="size-4" />
                    <span>{balance}</span>
                </span>,
                date,
            ];
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
