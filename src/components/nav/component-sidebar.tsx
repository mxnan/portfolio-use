// app/components/Sidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ArrowDownCircle } from "lucide-react";

const sidebarItems: {
  category: string;
  items: { name: string; href: string }[];
}[] = [
  {
    category: "Buttons",
    items: [
      { name: "Shimmer", href: "/components/buttons/shimmer" },
      { name: "Pulse", href: "/components/buttons/pulse" },
    ],
  },
  {
    category: "Loaders",
    items: [{ name: "Bounce", href: "/components/loaders/bounce" }],
  },

  // Add more categories and items as needed
];

export default function ComponentSidebar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    // Check on initial render
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  // useEffect for window resize
  return <section>{isMobile ? <MobileSidebar /> : <DesktopSidebar />}</section>;
}

export const DesktopSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="h-full overflow-y-auto">
      <div className="sticky top-0 p-4">
        <h2 className="text-xl font-bold mb-4">Components</h2>
        <Link
          href="/components"
          className={cn(
            "flex justify-between w-full mb-4 hover:translate-x-2 transition-transform ease-in-out duration-300",
            {
              "text-plight dark:text-pdark font-semibold translate-x-2 transition-transform ease-in-out duration-300":
                pathname === "/components",
              "text-gray-500": pathname !== "/components",
            }
          )}
        >
          <p className="custom-underline w-min pb-2">Introduction</p>{" "}
          <ArrowDownCircle className="w-5 h-5" />
        </Link>
        {sidebarItems.map((category) => (
          <div key={category.category} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{category.category}</h3>
            <ul className="space-y-2 ">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="mb-1 hover:translate-x-2 transition-transform ease-in-out duration-300"
                >
                  <Link
                    href={item.href}
                    className={cn("custom-underline w-max pb-2 ", {
                      "text-plight dark:text-pdark font-semibold ":
                        pathname === item.href,
                      "text-gray-500": pathname !== item.href,
                    })}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export const MobileSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="h-full overflow-y-auto">
      <div className="sticky top-0 p-4">
        <h2 className="text-base font-bold mb-4">Components</h2>
        <Link
          href="/components"
          className={cn("hover:underline text-sm block mb-4", {
            "text-blue-600 font-semibold": pathname === "/components",
            "text-gray-600": pathname !== "/components",
          })}
        >
          Introduction
        </Link>
        {sidebarItems.map((category) => (
          <div key={category.category} className="mb-4">
            <h3 className="text-lg text-stone-700 dark:text-stone-300 font-semibold mb-2">
              {category.category}
            </h3>
            <ul className="ml-2">
              {category.items.map((item) => (
                <li key={item.name} className="mb-1">
                  <Link
                    href={item.href}
                    className={cn("hover:underline text-sm", {
                      "text-blue-600 font-semibold": pathname === item.href,
                      "text-gray-600": pathname !== item.href,
                    })}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};
