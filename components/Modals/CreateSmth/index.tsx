"use client";

import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { RiEditLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "@/helpers/navigation";
import { motion } from "framer-motion";
import { popAnimation, popAnimationWithTransform } from "@/constants";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { closeModal } from "@/store/slices/openedModal";
import { LabelInput } from "@/components/ui/LabelInput";

export const CreateSmth = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [media, setMedia] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [duration, setDuration] = useState<string>("");

    const closeModalHandler = () => {
        dispatch(closeModal());
    };

    const onImageUpload = async (e: ChangeEvent) => {
        const file = (e.target as HTMLInputElement).files![0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setMedia(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const onCreateQuestSubmit = async (e: FormEvent) => {
        e.preventDefault();

        /* await createQuestHandler();
        router.refresh();
        toast.success("Квест успішно створено!");
        closeModalHandler */
    };

    return (
        <motion.div
            {...popAnimationWithTransform}
            className="max-h-[95vh] overflow-y-auto pt-4 fixed left-[50%] -translate-x-1/2 md:max-w-[700px] w-[95%] md:w-full md:top-10 top-4 z-10 bg-modalBg sm:p-6 flex flex-col rounded-lg bottom-4 text-primary"
        >
            <ReturnBtn className="self-start mt-2 mb-10 ml-2 sm:ml-4" />
            <div className="text-xl sm:text-3xl text-center">
                Створення Квесту
            </div>
            <div className="w-full p-4">
                <div className="relative w-full mt-2">
                    {media ? (
                        <motion.div
                            key={media}
                            {...popAnimation}
                            className="w-full"
                        >
                            <Image
                                src={media}
                                alt="Зображення квесту"
                                className="w-full aspect-square object-cover"
                                sizes="100vw"
                                height={0}
                                width={0}
                            />
                        </motion.div>
                    ) : (
                        <div className="w-full border-2 border-purple aspect-square flex items-center justify-center">
                            <BsFillImageFill className="size-20 text-primary" />
                        </div>
                    )}
                    <input
                        id="picture"
                        type="file"
                        ref={fileInputRef}
                        className="hidden "
                        accept=".png"
                        onChange={onImageUpload}
                    />
                    <Button
                        className="absolute right-4 p-3 bottom-4"
                        color="purpleBackground"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <RiEditLine className="size-4 sm:size-8" />
                    </Button>
                </div>
                <form className="w-full mt-6" onSubmit={onCreateQuestSubmit}>
                    <LabelInput
                        id="name"
                        labelTitle="Назва квесту"
                        value={title}
                        placeholder="Назва квесту..."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <LabelInput
                        id="description"
                        labelTitle="Опис квесту"
                        value={description}
                        placeholder="Опис квесту..."
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-4"
                    />
                    <LabelInput
                        id="duration"
                        labelTitle="Тривалість (хв)"
                        value={duration}
                        placeholder="Тривалість квесту..."
                        onChange={(e) => setDuration(e.target.value)}
                        className="mt-4"
                    />
                    <Button
                        color="purpleBackground"
                        type="submit"
                        className="mx-auto px-16 mt-8"
                    >
                        Зберегти
                    </Button>
                </form>
            </div>
        </motion.div>
    );
};
