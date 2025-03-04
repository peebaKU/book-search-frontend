'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Updated import

export default function Home() {
  const router = useRouter(); // Using useRouter from next/navigation
  const handleClick = () => {
    router.push("/pages/search");
  };

  return (
    <div className="min-h-screen bg-white from-[#ecf0f1] to-[#e5e5e5] dark:from-[#222] dark:to-[#111] flex flex-col items-center justify-center">
      <main className="flex flex-col items-center gap-8">
        <Image
          className="header-logo hover:animate-bounce cursor-pointer"
          onClick={() => router.push("/pages/search")}
          src="/logo/logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <button
          className="rounded-full bg-[#64e9f8] dark:bg-[#66d9ef] px-4 py-2 text-lg font-bold hover:bg-[#4dd0e1] dark:hover:bg-[#44c9e3]"
          onClick={handleClick}
        >
          Search books
        </button>
      </main>
    </div>
  );
}
