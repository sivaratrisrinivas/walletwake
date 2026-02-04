"use client";

import { useState } from "react";
import { useTamboThread, useTamboThreadInput } from "@tambo-ai/react";
import { MessageCircle, X, Send } from "lucide-react";

export function ChatOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const { thread } = useTamboThread();

    // NOTE: 'submit' takes no arguments in this version of the SDK 
    // because it automatically pulls from the 'value' state.
    const { value, setValue, submit, isPending } = useTamboThreadInput();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            submit(); // Corrected: No arguments needed
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-black dark:bg-white text-white dark:text-black p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-40 w-96 h-[500px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">

            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900">
                <h3 className="font-bold text-sm text-black dark:text-white">WalletWake Agent</h3>
                <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-black dark:hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {thread.messages.length === 0 && (
                    <div className="text-center text-zinc-400 text-sm mt-10">
                        Tell me what you want to buy...<br />I dare you.
                    </div>
                )}

                {thread.messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                            }`}>
                            {/* FIX: Handle Tambo's complex message content arrays */}
                            {Array.isArray(msg.content) ? (
                                msg.content.map((part: any, i: number) =>
                                    part.type === 'text' ? <span key={i}>{part.text}</span> : null
                                )
                            ) : (
                                <span>{typeof msg.content === 'string' ? msg.content : ''}</span>
                            )}
                        </div>

                        {/* The AI renders the component here */}
                        {msg.renderedComponent}
                    </div>
                ))}
                {isPending && <div className="text-xs text-zinc-400 animate-pulse">Agent is thinking...</div>}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 bg-white dark:bg-zinc-950">
                <input
                    className="flex-1 bg-transparent text-sm outline-none px-2 text-black dark:text-white placeholder:text-zinc-500"
                    placeholder="I want to buy..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-lg disabled:opacity-50 hover:opacity-80 transition-opacity"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}