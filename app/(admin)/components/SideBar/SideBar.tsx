import Link from "next/link";
import React from "react";

const Navs = [
  {
    name: "dashboard",
    path: "/dashboard",
    // icon:DashboardIcon
  },
  {
    name: "category",
    path: "/dashboard/category",
    // icon:PlusIcon
  },
  {
    name: "product",
    path: "/dashboard/products",
    // icon:PlusIcon
  },
  {
    name: "order",
    path: "/dashboard/orders",
    // icon:PlusIcon
  },
  {
    name: "customer",
    path: "/dashboard/customer",
    // icon:PlusIcon
  },
  {
    name: "report",
    path: "/dashboard/report",
    // icon:PlusIcon
  },
  {
    name: "setting",
    path: "/dashboard/setting",
    // icon:PlusIcon
  },
]


const SideBar = () => {
  return (
    <div className="w-60 h-screen bg-neutral-50 text-neutral-900 border-r-2 border-neutral-300">
      <div className="flex flex-col gap-4 p-4">
        {
          Navs.map((nav, index) => {
            return (
              <Link href={nav.path} key={index}>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-100 rounded-md p-2">
                  {/* <nav.icon className="h-6 w-6" /> */}
                  <span className="text-neutral-900">{nav.name}</span>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
};

export default SideBar;
