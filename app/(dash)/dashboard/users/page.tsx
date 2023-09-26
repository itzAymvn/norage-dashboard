"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "@/app/types";
import Loader from "@/app/components/Loader";
import Usercard from "@/app/components/Usercard";

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
                    <Loader />
                ) : filteredUsers.length === 0 ? (
                    <p className="text-gray-400">No users to display.</p>
                ) : (
                    filteredUsers.map((user, i) => (
                        <Usercard key={i} user={user} />
                    ))
                )}
            </div>
        </>
    );
};

export default Page;
