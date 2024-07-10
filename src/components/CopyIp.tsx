"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

export default function CopyIp() {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("worldmc.net").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        });
    };

    return (
        <button onClick={copyToClipboard} className="btn btn-primary">
            {copied ? (
                <>
                    <Check />
                    Copied!
                </>
            ) : (
                <>
                    <Clipboard />
                    worldmc.net
                </>
            )}
        </button>
    )
}