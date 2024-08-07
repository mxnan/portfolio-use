// app/components/Sidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


const sidebarItems: {
  category: string;
  items: { name: string; href: string }[];
}[] = [
  {
    category: "Buttons",
    items: [
      { name: "Shimmer", href: "/components/buttons/shimmer" },
      { name: "Bounce", href: "/components/buttons/bounce" },
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
  return <>{isMobile ? <MobileSidebar /> : <DesktopSidebar />}</>;
}

export const DesktopSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="h-full relative overflow-x-hidden overflow-y-auto">
      <div className="sticky top-0 p-4">
        <h2 className="text-xl font-bold mb-4">Components</h2>
        <Link
          href="/components"
          className={cn(
            "flex justify-between w-full mb-2 hover:translate-x-2 transition-transform ease-in-out duration-300",
            {
              "text-plight dark:text-pdark font-semibold translate-x-2 transition-transform ease-in-out duration-300":
                pathname === "/components",
              "text-gray-500": pathname !== "/components",
            }
          )}
        >
          <p className="custom-underline w-min pb-2">Introduction</p>
        </Link>
        <Link
          href="/components/playground"
          className={cn(
            "flex justify-between w-full mb-4 hover:translate-x-2 transition-transform ease-in-out duration-300",
            {
              "text-plight dark:text-pdark font-semibold translate-x-2 transition-transform ease-in-out duration-300":
                pathname === "/components/playground",
              "text-gray-500": pathname !== "/components/playground",
            }
          )}
        >
          <p className="custom-underline w-min pb-2">Playground</p>
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
                      "text-plight dark:text-pdark font-semibold translate-x-2 ":
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
    <nav className="h-full hidden overflow-y-auto">
      <div className="sticky top-0 p-2">
        <h2 className="text-base font-bold mb-4">Components</h2>
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
          <p className="custom-underline text-sm w-min pb-2">Introduction</p>
        </Link>
        {sidebarItems.map((category) => (
          <div key={category.category} className="mb-4">
            <h3 className="text-base font-semibold mb-2">
              {category.category}
            </h3>
            <ul className="space-y-2 ">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="mb-1 hover:translate-x-2 transition-transform ease-in-out duration-300"
                >
                  <Link
                    href={item.href}
                    className={cn("custom-underline text-sm w-max pb-2 ", {
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
