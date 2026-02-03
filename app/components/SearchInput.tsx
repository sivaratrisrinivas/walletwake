"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

export function SearchInput({ onSearch, isLoading }: SearchInputProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md relative group">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What do you want to buy?"
                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-lg"
                    disabled={isLoading}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
            </div>

            {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-zinc-200 border-t-black dark:border-zinc-700 dark:border-t-white rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    );
}