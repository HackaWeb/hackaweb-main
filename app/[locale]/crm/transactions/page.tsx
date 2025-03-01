import TransactionsPage from "@/components/crm/Transactions";
import { Transaction, TransactionResult } from "@/types/transaction.interface";
import React from "react";

const transactions: Transaction[] = [
    {
        type: TransactionResult.MORE,
        amount: 150.0,
        doneAt: "2025-03-01T14:00:00Z",
        remainder: 850.0,
        id: "txn_001",
    },
    {
        type: TransactionResult.LESS,
        amount: 200.0,
        doneAt: "2025-03-02T09:15:00Z",
        remainder: 650.0,
        id: "txn_002",
    },
    {
        type: TransactionResult.MORE,
        amount: 50.0,
        doneAt: "2025-03-02T16:30:00Z",
        remainder: 600.0,
        id: "txn_003",
    },
    {
        type: TransactionResult.LESS,
        amount: 100.0,
        doneAt: "2025-03-03T10:00:00Z",
        remainder: 500.0,
        id: "txn_004",
    },
    {
        type: TransactionResult.MORE,
        amount: 250.0,
        doneAt: "2025-03-03T12:45:00Z",
        remainder: 250.0,
        id: "txn_005",
    },
];

const Transactions = () => {
    return <TransactionsPage transactions={transactions} />;
};

export default Transactions;
