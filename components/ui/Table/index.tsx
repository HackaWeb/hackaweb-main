import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { TableProps } from "./Table.props";
import { Modal } from "@/types/modal.enum";
import { selectOpenedModal } from "@/store/slices/openedModal";
import { motion } from "framer-motion";

export const Table = ({ headers, data, className }: TableProps) => {
    const tableContainerRef = useRef<HTMLDivElement | null>(null);
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [tableWidth, setTableWidth] = useState(0);
    const [tableLeft, setTableLeft] = useState(0);
    const [columnWidths, setColumnWidths] = useState<number[]>([]);
    const [scrollLeft, setScrollLeft] = useState(0);

    const openedModal = useSelector(selectOpenedModal);

    useEffect(() => {
        const updateTableDimensions = () => {
            if (!tableRef.current) return;

            const rect = tableRef.current.getBoundingClientRect();
            setTableWidth(tableRef.current.offsetWidth);
            setTableLeft(rect.left);

            // Get column widths from the original <thead>
            const thElements = Array.from(
                tableRef.current.querySelectorAll("thead th"),
            );
            setColumnWidths(
                thElements.map((th) => th.getBoundingClientRect().width),
            );
        };

        const handleScroll = () => {
            if (!tableRef.current) return;
            setIsSticky(tableRef.current.getBoundingClientRect().top < 0);

            // Sync horizontal scroll position
            if (tableContainerRef.current) {
                setScrollLeft(tableContainerRef.current.scrollLeft);
            }
        };

        updateTableDimensions();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", updateTableDimensions);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateTableDimensions);
        };
    }, []);

    return (
        <div
            ref={tableContainerRef}
            className={cn("w-full overflow-x-auto rounded-md", className)}
            onScroll={() =>
                setScrollLeft(tableContainerRef.current?.scrollLeft || 0)
            }
        >
            {/* Cloned Sticky Header (conditionally rendered if no modal is open) */}
            {isSticky && openedModal === Modal.None && (
                <motion.div
                    className="fixed top-0 bg-white shadow-md z-50"
                    style={{ width: tableWidth, left: tableLeft - scrollLeft }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <table className="border-collapse text-primary w-full">
                        <thead>
                            <tr className="bg-secondary-light text-primary">
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="p-3 text-left"
                                        style={{
                                            width:
                                                columnWidths[index] || "auto",
                                        }}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </motion.div>
            )}

            {/* Original Table */}
            <table
                ref={tableRef}
                className="min-w-max border-collapse text-primary w-full"
            >
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
                                Немає даних
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
