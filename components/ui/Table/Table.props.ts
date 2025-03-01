import { ReactNode } from "react";

export interface TableProps {
    headers: string[];
    data: ReactNode[][];
    className?: string;
}