import { TransactionsPageComponent } from "@/components/crm/Transactions";
import { Transaction } from "@/types/transaction.interface";

const transactions: Transaction[] = [
    {
        type: "deposit",
        amount: 150.0,
        doneAt: "2025-03-01T14:00:00Z",
        remainder: 850.0,
        id: "txn_001",
        user: {
            firstName: "John",
            lastName: "Doe",
            id: "user_001",
            email: "",
            createdAt: new Date(),
        },
    },
    {
        type: "withdraw",
        amount: 200.0,
        doneAt: "2025-03-02T09:15:00Z",
        remainder: 650.0,
        id: "txn_002",
        user: {
            firstName: "John",
            lastName: "Doe",
            id: "user_001",
            email: "",
            createdAt: new Date(),
        },
    },
    {
        type: "deposit",
        amount: 50.0,
        doneAt: "2025-03-02T16:30:00Z",
        remainder: 600.0,
        id: "txn_003",
        user: {
            firstName: "John",
            lastName: "Doe",
            id: "user_001",
            email: "",
            createdAt: new Date(),
        },
    },
    {
        type: "deposit",
        amount: 100.0,
        doneAt: "2025-03-03T10:00:00Z",
        remainder: 500.0,
        id: "txn_004",
        user: {
            firstName: "John",
            lastName: "Doe",
            id: "user_001",
            email: "",
            createdAt: new Date(),
        },
    },
    {
        type: "withdraw",
        amount: 250.0,
        doneAt: "2025-03-03T12:45:00Z",
        remainder: 250.0,
        id: "txn_005",
        user: {
            firstName: "John",
            lastName: "Doe",
            id: "user_001",
            email: "",
            createdAt: new Date(),
        },
    },
];

const Transactions = () => {
    return <TransactionsPageComponent transactions={transactions} />;
};

export default Transactions;
