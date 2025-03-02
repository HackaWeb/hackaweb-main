"use client";

import React from "react";
import { TransactionProps } from "./Transactions.props";
import { Table } from "@/components/ui/Table";
import { RiCoinFill } from "react-icons/ri";
import { useTranslations } from "use-intl";
import { Link } from "@/helpers/navigation";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/constants";
import { formatDateTime } from "@/helpers/formatDate";

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
                <div>
                    <div
                        className={
                            "flex items-center gap-1 " +
                            (transaction.type === 1
                                ? "text-red font-semibold"
                                : "text-purple font-semibold")
                        }
                    >
                        <span>
                            {transaction.type === 1 ? "-" : "+"}
                            {transaction.amount.toFixed(0)}
                        </span>

                        <RiCoinFill
                            className={
                                transaction.type === 1
                                    ? "text-red"
                                    : "text-purple"
                            }
                        />
                    </div>
                </div>
            );
            const balance = (
                <div className="flex items-center gap-1 text-yellow font-semibold">
                    {transaction.balance.toFixed(0)}
                    <RiCoinFill className="size-4" />
                </div>
            );
            const date = formatDateTime(new Date(transaction.transactionDate));

            return [
                transaction.id,
                <Link href={`/crm/users/${transaction.user.id}`}>
                    {transaction.user.firstName} {transaction.user.lastName}
                </Link>,
                transaction.type === 1 ? (
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
        <motion.div
            {...slideFromBottomAnimation}
            className="grid bg-secondary-light p-6 rounded-md"
        >
            <h1 className="text-2xl font-bold mb-4 text-primary">
                {t("crm-transactions-title")}
            </h1>
            <Table headers={headers} data={transactionData} className="mt-4" />
        </motion.div>
    );
};
