"use client";

import { closeModal, selectOpenedModal } from "@/store/slices/openedModal";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { cn } from "@/helpers/cn";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { Modal } from "@/types/modal.enum";
import { CreateSmth } from "./CreateSmth";

export const Modals = () => {
    const dispatch = useAppDispatch();
    const openedModal = useAppSelector(selectOpenedModal);

    const modalRef = useRef<HTMLDivElement>(null);

    const closeModalHandler = () => {
        dispatch(closeModal());
    };

    const renderOpenedModal = (modal: Modal) => {
        switch (modal) {
            case Modal.CreateSmth:
                return <CreateSmth />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (openedModal && modalRef.current) {
            modalRef.current.focus();
        }
    }, [openedModal]);

    return (
        <>
            <div
                className={cn(
                    "fixed top-0 right-0 left-0 bottom-0 bg-black w-full h-full ",
                    openedModal.length
                        ? "opacity-50 z-40 duration-500"
                        : "opacity-0 -z-10 duration-0",
                )}
                onClick={closeModalHandler}
                aria-hidden={!openedModal}
                tabIndex={-1}
            ></div>
            <div
                ref={modalRef}
                className={cn(
                    "opacity-0 transition-all duration-500",
                    openedModal ? "z-50 opacity-100" : "-z-10 opacity-0",
                )}
                role="dialog"
                aria-labelledby="modal-title"
                aria-hidden={!openedModal}
                aria-live={openedModal ? "assertive" : "off"}
                tabIndex={-1}
            >
                {renderOpenedModal(openedModal)}
            </div>
        </>
    );
};
