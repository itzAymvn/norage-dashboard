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
    discord_name: string;
    minecraft_uuid: string;
    minecraft_name: string;
    minecraft_avatar: string;
    bug_hunter: boolean;
    achievements: Achievement[];
}

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        const getUsers = async () => {
            const res = await fetch("/api/users");
            const data = await res.json();
            return data;
        };

        getUsers().then((data) => {
            Promise.all(
                data.map(async (user: User) => {
                    try {
                        // Fetch the discord and minecraft data for each user
                        const [discordRes, minecraftRes] = await Promise.all([
                            fetch(`/api/discord/users/${user.discord_id}`),
                            fetch(`/api/minecraft/${user.minecraft_uuid}`),
                        ]);
                        const [discordData, minecraftData] = await Promise.all([
                            discordRes.json(),
                            minecraftRes.json(),
                        ]);

                        // Update the user with the new data
                        const updatedUser = {
                            ...user,
                            discord_name: discordData.username,
                            minecraft_name: minecraftData.name,
                            minecraft_avatar: minecraftData.avatar,
                        };

                        // Return the updated user
                        return updatedUser;
                    } catch (error) {
                        console.error(error);
                        return user;
                    }
                })
            ).then((updatedUsers) => {
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers); // Initialize filteredUsers with all users
                setIsLoading(false);
            });
        });
    }, []);

    useEffect(() => {
        // Filter users based on search query when searchQuery changes
        const filtered = users.filter(
            (user) =>
                user.discord_id.includes(searchQuery) ||
                user.minecraft_uuid.includes(searchQuery) ||
                user.minecraft_name.includes(searchQuery) ||
                user.discord_name.includes(searchQuery)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    return (
        <>
            <input
                type="text"
                placeholder="Search by Discord ID, Minecraft UUID, Minecraft Name, or Discord Name"
                className="bg-gray-800 text-white border p-4 rounded-lg mb-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : filteredUsers.length === 0 ? (
                    <p className="text-gray-400">No users to display.</p>
                ) : (
                    filteredUsers.map((user, i) => (
                        <Link
                            href={`/dashboard/users/${user._id}`}
                            key={i}
                            className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:bg-gray-600 break-words"
                        >
                            <Image
                                width={80}
                                height={80}
                                src={user.minecraft_avatar}
                                alt={`${user.minecraft_name}'s Avatar`}
                                className="w-20 h-20 mx-auto rounded-full border-4 border-gray-600"
                            />
                            <h1 className="text-xl font-semibold text-white mt-4">
                                {user.discord_name}{" "}
                                <span className="text-gray-400 text-sm">
                                    [{user.minecraft_name}]
                                </span>
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Discord ID: {user.discord_id}
                            </p>

                            <p className="text-gray-400 text-sm">
                                Minecraft UUID: {user.minecraft_uuid}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
};

export default Page;
