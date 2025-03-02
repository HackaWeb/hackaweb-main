import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BalanceState } from "./balance.type";

const initialState: BalanceState = {
    balance: 0,
};

const balance = createSlice({
    name: "balance",
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
    },
    selectors: {
        selectBalance: (state) => state.balance,
    },
});

export const { selectBalance } = balance.selectors;
export const { setBalance } = balance.actions;

export default balance.reducer;
