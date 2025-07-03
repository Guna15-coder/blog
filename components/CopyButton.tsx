"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/80 transition"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
