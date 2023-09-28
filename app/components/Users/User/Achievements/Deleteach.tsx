"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Achievement } from "@/app/types";

import { RemoveAchievement } from "@/app/actions";
import { useTransition } from "react";
import toast from "react-hot-toast";

const Deleteach = ({ achievement }: { achievement: Achievement }) => {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        const { success, message } = await RemoveAchievement(achievement._id);

        if (!success) {
            toast.error(message);
        } else toast.success(message);
    };

    return (
        <button
            className="absolute bottom-0 right-0 p-2 text-white rounded-lg hover:text-red-500 transition duration-200 ease-in-out"
            onClick={() => {
                startTransition(() => {
                    handleDelete();
                });
            }}
        >
            {isPending ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
                <FontAwesomeIcon icon={faTrash} />
            )}
        </button>
    );
};

export default Deleteach;
