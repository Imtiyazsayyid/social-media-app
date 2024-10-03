import { useUser } from "@/hooks/useUser";
import { ActivityIcon, HomeIcon, LucideProps, PlusCircleIcon, SearchIcon, UserIcon } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavLinks {
  route: "string";
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const getNavLinks = async () => {
  const { username } = await useUser();

  return [
    {
      route: "/",
      icon: HomeIcon,
    },
    // {
    //   route: "/search",
    //   icon: SearchIcon,
    // },

    {
      route: "/new-post",
      icon: PlusCircleIcon,
    },

    // {
    //   route: "/activity",
    //   icon: ActivityIcon,
    // },
    {
      route: "/profile/" + username,
      icon: UserIcon,
    },
  ] as NavLinks[];
};
