import { cn } from "@/lib/utils";
import { TableProps } from "./Table.props";
import { useTranslations } from "next-intl";

export const Table = ({ headers, data, className }: TableProps) => {
    const t = useTranslations("Table");
    return (
        <div
            className={cn(
                "w-full overflow-x-auto rounded-md relative",
                className,
            )}
        >
            <table className="min-w-max border-collapse text-primary w-full">
                <thead>
                    <tr className="bg-secondary-light text-primary">
                        {headers.map((header, index) => (
                            <th key={index} className="p-3 text-left">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length ? (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-t border-gray-800"
                            >
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="py-2 px-2 text-sm xsm:text-base"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={headers.length}
                                className="py-2 px-2 text-center"
                            >
                                {t("no-data")}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
