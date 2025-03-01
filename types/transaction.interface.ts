export enum TransactionResult {
    LESS,
    MORE,
}

export interface Transaction {
    type: TransactionResult;
    amount: number;
    doneAt: string;
    remainder: number;
    id: string;
}
