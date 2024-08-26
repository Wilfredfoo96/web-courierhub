import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Package,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Shipment",
      menus: [
        // {
        //   href: "",
        //   label: "Posts",
        //   active: pathname.includes("/posts"),
        //   icon: SquarePen,
        //   submenus: [
        //     {
        //       href: "/posts",
        //       label: "All Posts",
        //       active: pathname === "/posts",
        //     },
        //     {
        //       href: "/posts/new",
        //       label: "New Post",
        //       active: pathname === "/posts/new",
        //     },
        //   ],
        // },
        {
          href: "/send-parcel",
          label: "Send Parcel",
          active: pathname.includes("/send-parcel"),
          icon: Package,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
