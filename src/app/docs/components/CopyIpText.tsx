"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

export default function CopyIpText({ text }: { text: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <button onClick={copyToClipboard} className="link-secondary">
      {copied ? (
        <>
          {text}
          <Check className="ml-1 inline-block size-4" />
        </>
      ) : (
        <>
          {text}
          <Clipboard className="ml-1 inline-block size-4" />
        </>
      )}
    </button>
  );
}
