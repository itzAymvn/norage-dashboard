"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Achievement {
    name: string;
    description: string;
    date: Date | string;
}

interface User {
    _id: string;
    discord_id: string;
    discord_avatar: string;
    discord_name: string;
    minecraft_uuid: string;
    minecraft_name: string;
    minecraft_avatar: string;
    bug_hunter: boolean;
    achievements: Achievement[];
}

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const [user, setUser] = useState<User | null>(null);
    const [editedUUID, setEditedUUID] = useState<string>(user?.minecraft_uuid!);
    const [editedID, setEditedID] = useState<string>(user?.discord_id!);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleSaveUserInformation = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editedID || !editedUUID)
            return setError("Please fill out all fields.");

        const res = await fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                discord_id: editedID,
                minecraft_uuid: editedUUID,
            }),
        });

        const data = await res.json();
        if (data.error) {
            setError(data.error);
            return;
        }

        // Update the user
        setUser(data);
        setError(null);
    };

    useEffect(() => {
        setIsLoading(true);

        const getUser = async () => {
            const res = await fetch(`/api/users/${id}`);
            const data = await res.json();
            return data;
        };

        getUser().then((data) => {
            if (!data?._id) {
                setIsLoading(false);
                return;
            }
            // Fetch the discord name & minecraft name
            Promise.all([
                fetch(`/api/discord/users/${data.discord_id}`),
                fetch(`/api/minecraft/${data.minecraft_uuid}`),
            ]).then(async ([discordRes, minecraftRes]) => {
                const [discordData, minecraftData] = await Promise.all([
                    discordRes.json(),
                    minecraftRes.json(),
                ]);

                // Update the user with the new data
                const updatedUser = {
                    ...data,
                    discord_name: discordData.username || "Invalid ID",
                    discord_avatar: discordData.avatarURL,
                    minecraft_name: minecraftData.name || "Invalid UUID",
                    minecraft_avatar: minecraftData.avatar,
                };

                // Return the updated user
                setUser(updatedUser);
                setEditedID(updatedUser.discord_id);
                setEditedUUID(updatedUser.minecraft_uuid);
                setIsLoading(false);
            });
        });
    }, [id]);

    return isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <svg
                className="animate-spin h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0
                        014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    ) : (
        (user && (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-100">
                    <form
                        onSubmit={handleSaveUserInformation}
                        className="flex flex-col gap-4 p-4 w-full bg-gray-700 rounded-lg shadow-md"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex items-center gap-2 justify-center w-full md:w-1/2">
                                <Image
                                    src={user.discord_avatar || "/discord.png"}
                                    alt="Discord Logo"
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                />
                                <div className="flex-grow p-4 h-full flex flex-col justify-around bg-gray-700 rounded-lg shadow-md">
                                    <label className="text-white text-lg font-semibold">
                                        Discord{" "}
                                        <a
                                            href={`https://discord.com/users/${user.discord_id}`}
                                            className="text-blue-500 hover:text-blue-400 transition duration-200 ease-in-out"
                                        >
                                            [{user.discord_name}]
                                        </a>
                                    </label>
                                    <input
                                        className="w-full px-4 text-lg text-black placeholder-gray-400 border rounded-lg focus:ring focus:ring-blue-300"
                                        type="text"
                                        placeholder="Discord ID"
                                        value={editedID}
                                        onChange={(e) =>
                                            setEditedID(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 justify-center w-full md:w-1/2">
                                <Image
                                    src={user.minecraft_avatar || "/steve.png"}
                                    alt="Minecraft Logo"
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                />
                                <div className="flex-grow p-4 h-full flex flex-col justify-around bg-gray-700 rounded-lg shadow-md">
                                    <label className="text-white text-lg font-semibold">
                                        Minecraft{" "}
                                        <a
                                            href={`https://namemc.com/profile/${user.minecraft_uuid}`}
                                            className="text-blue-500 hover:text-blue-400 transition duration-200 ease-in-out"
                                        >
                                            [{user.minecraft_name}]
                                        </a>
                                    </label>
                                    <input
                                        className="w-full px-4 text-lg text-black placeholder-gray-400 border rounded-lg focus:ring focus:ring-blue-300"
                                        type="text"
                                        placeholder="Minecraft UUID"
                                        value={editedUUID}
                                        onChange={(e) =>
                                            setEditedUUID(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            className={
                                "w-full h-12 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300 " +
                                (editedUUID !== user.minecraft_uuid ||
                                editedID !== user.discord_id
                                    ? "block"
                                    : "hidden")
                            }
                            type="submit"
                            disabled={editedID === user.discord_id}
                        >
                            Save
                        </button>

                        {error && (
                            <div className="w-full h-12 text-lg font-semibold text-white bg-red-600 rounded-lg flex items-center justify-center border border-red-700 opacity-80">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
                {user?.achievements?.length > 0 && (
                    <div className="p-4 bg-gray-700 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4">
                            Achievements [{user.achievements.length}]
                        </h1>
                        <div className="w-full">
                            <table className="w-full bg-gray-800 text-white">
                                <thead>
                                    <tr>
                                        <th className="text-left px-4 py-2">
                                            Name
                                        </th>
                                        <th className="text-left px-4 py-2">
                                            Description
                                        </th>
                                        <th className="text-left px-4 py-2">
                                            Date
                                        </th>
                                        <th className="text-left px-4 py-2">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.achievements.map((achievement) => (
                                        <tr key={achievement.name}>
                                            <td className="px-4 py-2">
                                                {achievement.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {achievement.description}
                                            </td>
                                            <td className="px-4 py-2">
                                                {new Date(
                                                    achievement.date
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-2 py-2 flex gap-2">
                                                <button className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none">
                                                    Delete
                                                </button>
                                                <button className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        )) || (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="text-gray-400">User not found.</p>
                <Link
                    href="/dashboard/users"
                    className="bg-blue-500 text-white rounded-lg p-4 mt-4 hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                    Go Back
                </Link>
            </div>
        )
    );
}
