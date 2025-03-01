import { cn } from "@/lib/utils";
import { TableProps } from "./Table.props";

export const Table = ({ headers, data, className }: TableProps) => {
    return (
        <div className={cn("overflow-x-auto w-full rounded-md", className)}>
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
                                        className="py-2 xsm:px-4 px-2 text-sm xsm:text-base max-w-48 break-words overflow-wrap"
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
                                className="py-2 px-2 xsm:px-4 text-center"
                            >
                                Немає даних
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
