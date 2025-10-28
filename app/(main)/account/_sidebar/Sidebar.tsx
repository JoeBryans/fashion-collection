import { Archive, BellPlus, Book, BookAIcon, BookCheck, CreditCard, Inbox, LucideProps, Save, ScanEye, ShieldCheck, ShowerHead, User2, WalletCards } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navs = [
    {
        name: "Orders",
        path: "/account/order",
        icon:BookCheck
        // icon:DashboardIcon
    },
    {
        name: "Profile",
        path: "/account/profile",
        icon:User2
    },
    {
        name: "Reviews",
        path: "/account/saved-items",
        icon: ScanEye 
        
    },
    {
        name: "Saved Items",
        path: "/account/saved-items",
        icon: Archive 
    },
    {
        name: "Inbox",
        path: "/account/inbox",
        icon: Inbox
    },
    {
        name: "Address",
        path: "/account/address",
        icon: User2
    },
    {
        name: "Order History",
        path: "/account/order-history",
        icon: User2
    },
    {
        name: "Payments",
        path: "/account/payments",
        icon: CreditCard
        // icon: WalletCards
    },
    // {
    //     name: "Account Settings",
    //     path: "/account/settings",
        // icon: ShieldCheck
    // <ShieldBan />
    // },
    {
        name: "Notifications",
        path: "/account/notifications",
        icon: BellPlus
    }
    

   
]

interface Navs{
    name:string
    path:string
    icon:React.FC<LucideProps>
}


const SideBarAcc = () => {
    return (
        <div className="w-full h-screen  text-neutral-900 ">
            <div className="flex flex-col gap-2 p-2 ">
                {
                    Navs.map((nav:Navs, index:number) => {
                        return (
                            <Link href={nav.path} key={index}>
                                <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-100 rounded-md p-1.5">
                                    <nav.icon className="" 
                                    size={15}
                                    />
                                    <span className="text-neutral-900 ">{nav.name}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default SideBarAcc;
