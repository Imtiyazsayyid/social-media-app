"use client";

import { getNavLinks, NavLinks } from "@/lib/navRoutes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [navLinks, setNavLinks] = useState<NavLinks[]>([]);

  const getAllNavLinks = async () => {
    const data = await getNavLinks();
    setNavLinks(data);
  };

  useEffect(() => {
    getAllNavLinks();
  }, []);

  if (!navLinks.length) return null;

  return (
    <nav className="flex justify-center items-center w-full h-20 max-h-20 fixed bottom-2 sm:bottom-8 left-0 py-2 px-4">
      {/* <div className="bg-indigo-600 bg-opacity-100 w-full h-full"></div> */}
      <div className="h-full w-fit rounded-full shadow-md bg-dark-400-opaque justify-center items-center flex gap-2 px-2">
        {navLinks.map((link) => (
          <div
            className={`h-fit w-fit p-3 rounded-full cursor-pointer ${
              pathname === link.route && "bg-dark-300"
            }`}
            key={link.route}
            onClick={() => router.push(link.route)}
          >
            <link.icon className="text-white" />
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Topbar;
