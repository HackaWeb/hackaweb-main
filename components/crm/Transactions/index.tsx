"use client";

import React from "react";
import { TransactionProps } from "./Transactions.props";
import { Table } from "@/components/ui/Table";
import { RiCoinFill } from "react-icons/ri";
import { useTranslations } from "use-intl";
import { Link } from "@/helpers/navigation";

export const TransactionsPageComponent = ({
    transactions,
}: TransactionProps) => {
    const t = useTranslations("CRM");

    const headers = [
        t("id"),
        t("user"),
        t("transaction-type"),
        t("transaction-summ"),
        t("transaction-balance"),
        t("transaction-date"),
    ];

    const transactionData: React.ReactNode[][] = transactions.map(
        (transaction) => {
            const amount = (
                <div className="flex items-center gap-1">
                    <RiCoinFill
                        className={
                            transaction.type === "withdraw"
                                ? "text-red"
                                : "text-purple"
                        }
                    />
                    <div
                        className={
                            transaction.type === "withdraw"
                                ? "text-red font-semibold"
                                : "text-purple font-semibold"
                        }
                    >
                        {transaction.type === "withdraw" ? "-" : "+"}
                        {transaction.amount}
                    </div>
                </div>
            );
            const balance = (
                <div className="flex items-center gap-1 text-yellow font-semibold">
                    <RiCoinFill className="size-4" />
                    {transaction.remainder}
                </div>
            );
            const date = new Date(transaction.doneAt).toLocaleDateString();

            return [
                transaction.id,
                <Link href={`/crm/users/${transaction.user.id}`}>
                    {transaction.user.firstName} {transaction.user.lastName}
                </Link>,
                transaction.type === "withdraw" ? (
                    <span className="text-red">
                        {t("transaction-type-withdrawal")}
                    </span>
                ) : (
                    <span className="text-purple">
                        {t("transaction-type-deposit")}
                    </span>
                ),
                amount,
                balance,
                date,
            ];
        },
    );

    return (
        <div className="grid bg-secondary-light p-6 rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-primary">
                {t("crm-transactions-title")}
            </h1>
            <Table headers={headers} data={transactionData} className="mt-4" />
        </div>
    );
};
