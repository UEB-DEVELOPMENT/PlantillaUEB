import React from "react";
import Image from "next/image";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-white/10 px-4 py-5 text-center backdrop-blur-sm dark:bg-white/[0.03]`}
    >
      <Image
        src="/images/logo/logo.png"
        alt="UEB"
        width={80}
        height={24}
        className="mx-auto"
      />
    </div>
  );
}
