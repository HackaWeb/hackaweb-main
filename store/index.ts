import { configureStore } from "@reduxjs/toolkit";
import openedModal from "./slices/openedModal";
import aside from "./slices/aside";

export const store = configureStore({
    reducer: { openedModal, aside },
});
