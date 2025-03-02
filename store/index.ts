import { configureStore } from "@reduxjs/toolkit";
import openedModal from "./slices/openedModal";
import aside from "./slices/aside";
import balance from "./slices/balance";

export const store = configureStore({
    reducer: { openedModal, aside, balance },
});
