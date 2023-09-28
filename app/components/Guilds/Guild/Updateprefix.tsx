"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guild } from "@/app/types";
import { faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useTransition } from "react";
import { UpdateGuildPrefix } from "@/app/actions";
import toast from "react-hot-toast";

const Updateprefix = ({ guild }: { guild: Guild }) => {
    const [prefix, setPrefix] = useState(guild.prefix);
    const [isPending, startTransition] = useTransition();

    const ChangePrefix = async () => {
        const { success, message } = await UpdateGuildPrefix(
            guild.guild_id,
            prefix
        );

        if (!success) {
            toast.error(message);
        } else toast.success(message);
    };

    useEffect(() => {
        if (prefix.includes(" ")) {
            setPrefix(prefix.replace(" ", "-"));
        }

        if (
            prefix.includes("\\") ||
            prefix.includes("`") ||
            prefix.includes("**") ||
            prefix.includes("_") ||
            prefix.includes("~") ||
            prefix.includes("||") ||
            prefix.includes(">") ||
            prefix.includes("@") ||
            prefix.includes("#") ||
            prefix.includes(":") ||
            prefix.includes("||") ||
            prefix.includes("`")
        ) {
            setPrefix(prefix.replace(/\\|`|\*|_|~|\||>|@|#|:|\||`/g, ""));
        }
    }, [prefix]);

    return (
        <div className="flex flex-col md:flex-row gap-4 mt-4">
            <input
                type="text"
                className="bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                placeholder="New prefix"
                maxLength={5}
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
            />
            <button
                className={
                    "bg-gray-700 hover:bg-gray-800 text-white rounded-lg p-2" +
                    (isPending || prefix === guild.prefix
                        ? " opacity-50 cursor-not-allowed"
                        : "")
                }
                title={
                    isPending || prefix === guild.prefix
                        ? "You must change the prefix to update it."
                        : "Update the prefix."
                }
                onClick={() => {
                    startTransition(ChangePrefix);
                }}
                disabled={isPending || prefix === guild.prefix}
            >
                {isPending ? (
                    <FontAwesomeIcon icon={faSpinner} className="mr-2" spin />
                ) : (
                    <>
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Change prefix
                    </>
                )}
            </button>
        </div>
    );
};

export default Updateprefix;
