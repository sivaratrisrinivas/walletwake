"use client";

import { useState } from "react";
import { useTamboThread, useTamboThreadInput } from "@tambo-ai/react";
import { MessageCircle, X, ArrowUp } from "lucide-react";

export function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) submit();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-accent text-accent-foreground p-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[380px] h-[480px] bg-card border border-border rounded-[var(--radius-xl)] shadow-xl flex flex-col overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-sm text-card-foreground">
            WalletWake
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Financial intervention agent
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-surface"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {thread.messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm mt-16 space-y-1">
            <p className="text-base">What do you want to buy?</p>
            <p className="text-xs text-muted-foreground/60">I dare you.</p>
          </div>
        )}

        {thread.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-accent-foreground rounded-br-md"
                  : "bg-surface text-card-foreground rounded-bl-md"
              }`}
            >
              {Array.isArray(msg.content) ? (
                msg.content.map((part: any, i: number) =>
                  part.type === "text" ? <span key={i}>{part.text}</span> : null
                )
              ) : (
                <span>
                  {typeof msg.content === "string" ? msg.content : ""}
                </span>
              )}
            </div>
            {msg.renderedComponent}
          </div>
        ))}

        {isPending && (
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <div className="flex gap-0.5">
              <span className="w-1 h-1 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1 h-1 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1 h-1 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            Thinking
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 border-t border-border flex items-center gap-2"
      >
        <input
          className="flex-1 bg-transparent text-[13px] outline-none text-card-foreground placeholder:text-muted-foreground/50 px-1"
          placeholder="I want to buy..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          disabled={isPending || !value.trim()}
          className="bg-accent text-accent-foreground p-2 rounded-full disabled:opacity-30 hover:bg-accent-hover transition-colors shrink-0"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
