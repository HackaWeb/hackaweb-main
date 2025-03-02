import { TransactionsPageComponent } from "@/components/crm/Transactions";
import { getTransactions } from "@/apis/transactions";
import CRMMenu from "@/components/common/CRMMenu";

const Transactions = async () => {
    const transactions = await getTransactions();

    return (
        <>
            <CRMMenu />
            <TransactionsPageComponent transactions={transactions} />
        </>
    );
};

export default Transactions;
