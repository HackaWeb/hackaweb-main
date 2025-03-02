import { fetchApi } from "./fetchApi";
import { Transaction } from "@/types/transaction.interface";

interface AddTransactionBody {
    createdAt: string;
    amount: number;
}

export const getMyTransactions = async (): Promise<Transaction[]> =>
    fetchApi({
        endpoint: `/transactions`,
        isAuthRequired: true,
        method: "GET",
    });

export const getTransactions = async (): Promise<Transaction[]> =>
    fetchApi({
        endpoint: `/transactions/all`,
        isAuthRequired: true,
        method: "GET",
    });

export const addTransaction = async (body: AddTransactionBody) =>
    fetchApi({
        endpoint: `/transactions`,
        isAuthRequired: true,
        method: "POST",
        body,
    });
