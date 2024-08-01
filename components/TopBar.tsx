import { getSingleClerkUser } from "@/lib/actions/user.actions";
import { OrganizationSwitcher, SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function Topbar() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const user = await getSingleClerkUser(clerkUser.id);

  return (
    <nav className="flex justify-between w-full h-20 max-h-20 px-10 absolute left-0 top-0 border-b border-b-stone-800">
      <Link href="/" className="flex items-center gap-4">
        <div className="p-1 rounded-xl bg-white">
          <Image src="/logo.png" alt="logo" width={28} height={28} />
        </div>
        <p className="text-white text-3xl font-bold max-xs:hidden">Connect</p>
      </Link>

      <div className="flex items-center">
        {/* <div>
          <SignedIn>
            <SignOutButton redirectUrl="/sign-in">
              <div className="flex cursor-pointer">
                <LogOutIcon className="text-rose-800" />
              </div>
            </SignOutButton>
          </SignedIn>
        </div> */}

        <div>
          <SignedIn>
            <div className="flex gap-3">
              <div className="text-right">
                <h1 className="text-md text-white font-bold">{clerkUser?.fullName}</h1>
                <p className="text-sm text-white">@{user?.username}</p>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "min-h-10 min-w-10",
                  },
                }}
              ></UserButton>
            </div>
          </SignedIn>
        </div>

        {/* <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        /> */}
      </div>
    </nav>
  );
}

export default Topbar;
