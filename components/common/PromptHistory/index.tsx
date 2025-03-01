import { Table } from "@/components/ui/Table";
import { useTranslations } from "next-intl";
import React from "react";
import { PromptHistoryProps } from "./PromptHistory.props";

const PromptHistory = ({ history: data }: PromptHistoryProps) => {
    const t = useTranslations("Profile");
    const headersT = useTranslations("PromptTable");
    return (
        <div>
            <div className="bg-secondary-light p-4 rounded-md overflow-hidden">
                <div className="text-primary font-semibold text-lg">
                    {t("prompt-history")}
                </div>
                <Table
                    className="mt-4"
                    headers={["id", "contents", "date"].map((item) =>
                        headersT(item),
                    )}
                    data={data}
                />
            </div>
        </div>
    );
};

export default PromptHistory;
