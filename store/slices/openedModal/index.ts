import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpenedModalState } from "./modals.type";
import { Modal } from "@/types/modal.enum";

const initialState: OpenedModalState = {
    openedModal: Modal.None,
};

const openedModal = createSlice({
    name: "openedModal",
    initialState,
    reducers: {
        setOpenedModal: (state, action: PayloadAction<Modal>) => {
            state.openedModal = action.payload;
        },
        closeModal: (state) => {
            state.openedModal = Modal.None;
        },
    },
    selectors: {
        selectOpenedModal: (state) => state.openedModal,
    },
});

export const { selectOpenedModal } = openedModal.selectors;
export const { closeModal, setOpenedModal } = openedModal.actions;

export default openedModal.reducer;
