import { TransactionsPageComponent } from "@/components/crm/Transactions";
import { getTransactions } from "@/apis/transactions";

const Transactions = async () => {
    const transactions = await getTransactions();

    return <TransactionsPageComponent transactions={transactions} />;
};

export default Transactions;
