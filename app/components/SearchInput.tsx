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
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md relative group">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to buy?"
          className="w-full h-13 pl-11 pr-4 bg-card text-foreground border border-border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-[15px] placeholder:text-muted-foreground/60"
          disabled={isLoading}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 w-[18px] h-[18px] group-focus-within:text-accent transition-colors duration-200" />
      </div>

      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-border border-t-accent rounded-full animate-spin" />
        </div>
      )}
    </form>
  );
}
