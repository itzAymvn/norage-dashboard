"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const Searchuser = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    // const [debouncedSearchQuery] = useDebounce(searchQuery, 350);

    useEffect(() => {
        if (searchQuery) {
            router.push(`/dashboard/users?search=${searchQuery}`);
        } else {
            router.push("/dashboard/users");
        }
    }, [searchQuery]);

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
