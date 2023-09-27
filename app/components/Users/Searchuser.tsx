"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "usehooks-ts";

const Searchuser = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 350); // Debounce the search query by 350ms

    useEffect(() => {
        if (debouncedSearchQuery) {
            router.push(`/dashboard/users?search=${debouncedSearchQuery}`);
        } else {
            router.push("/dashboard/users");
        }
    }, [router, debouncedSearchQuery]);

    return (
        <input
            type="text"
            placeholder="Search by Discord ID, Minecraft UUID, Minecraft Name, or Discord Name"
            className="bg-gray-800 text-white border p-4 rounded-lg mb-4 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
};

export default Searchuser;
