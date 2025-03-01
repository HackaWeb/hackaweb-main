import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { TableProps } from "./Table.props";
import { Modal } from "@/types/modal.enum";
import { selectOpenedModal } from "@/store/slices/openedModal";
export const Table = ({ headers, data, className }: TableProps) => {
    const tableContainerRef = useRef<HTMLDivElement | null>(null);
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [stickyTop, setStickyTop] = useState(0);
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
            setTableLeft(rect.left + window.scrollX);

            // Get column widths from the original <thead>
            const thElements = Array.from(
                tableRef.current.querySelectorAll("thead th"),
            );
            setColumnWidths(
                thElements.map((th) => th.getBoundingClientRect().width),
            );

            // Determine when to stick
            setStickyTop(rect.top + window.scrollY);
        };

        const handleScroll = () => {
            if (!tableRef.current) return;

            const rect = tableRef.current.getBoundingClientRect();
            setIsSticky(rect.top <= 0 && rect.bottom > 0);

            // Sync horizontal scroll
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
            className={cn(
                "w-full overflow-x-auto rounded-md relative",
                className,
            )}
            onScroll={() =>
                setScrollLeft(tableContainerRef.current?.scrollLeft || 0)
            }
        >
            {/* Wrapper div to ensure proper positioning of header and table */}
            <div className="relative">
                {/* Overlay to hide overflowed cloned header (on the left side) */}
                {isSticky && openedModal === Modal.None && (
                    <div
                        className="absolute top-0 left-0 z-50"
                        style={{
                            width: `${scrollLeft}px`, // Adjust overlay width to match scroll left
                            height: "100%", // Ensure it covers the full height
                            display: "block", // Only show when sticky
                        }}
                    ></div>
                )}

                {/* Sticky Header */}
                {isSticky && openedModal === Modal.None && (
                    <div
                        className="fixed top-0 left-0 bg-secondary-light backdrop-blur-lg shadow-md z-50"
                        style={{
                            width: tableWidth,
                            left: tableLeft - scrollLeft, // Keeps it aligned with the table
                            boxSizing: "border-box", // Prevent overflow due to padding/borders
                            clipPath: `inset(0px ${scrollLeft}px 0px 0px)`, // Clip the header if it overflows
                        }}
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
                                                    columnWidths[index] ||
                                                    "auto",
                                            }}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        </table>
                    </div>
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
        </div>
    );
};
