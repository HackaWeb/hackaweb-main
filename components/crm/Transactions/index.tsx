"use client";
import React from "react";
import { TransactionProps } from "./Transactions.props";
import { Table } from "@/components/ui/Table";
import { TransactionResult } from "@/types/transaction.interface";
import { formatDate } from "@/helpers/formatDate";

const TransactionsPage = ({ transactions }: TransactionProps) => {
    const headers = ["ID", "Тип", "Сума", "Залишок", "Дата"];
    const data = transactions.map((operation) => [
        operation.id,
        operation.type == TransactionResult.LESS ? "Виведення" : "Поповнення",
        operation.amount,
        operation.remainder,
        formatDate(operation.doneAt),
    ]);
    return (
        <div>
            <Table headers={headers} data={data} />
        </div>
    );
};

export default TransactionsPage;
