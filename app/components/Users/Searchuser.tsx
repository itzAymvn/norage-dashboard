"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "usehooks-ts";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Searchuser = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 350); // Debounce the search query by 350ms

    useEffect(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("search", debouncedSearchQuery);
        router.push(`${pathname}?${current.toString()}`);
    }, [router, debouncedSearchQuery]);

    const handleResetSearch = () => {
        setSearchQuery(""); // Clear the search query
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.delete("search"); // Remove the "search" parameter from the URL
        router.push(`${pathname}?${current.toString()}`);
    };

    return (
        <div className="relative flex items-center">
            <div className="relative w-full mb-3">
                <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search users by their discord ID, discord username, minecraft username, or minecraft UUID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                />
                <button className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FontAwesomeIcon
                        icon={faDeleteLeft}
                        onClick={handleResetSearch}
                    />
                </button>
            </div>
        </div>
    );
};

export default Searchuser;
