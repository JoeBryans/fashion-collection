"use client"
import Currency from "@/components/ui/currency";
import { DashboardQuery } from "../dashboard/page";
import ChartCard from "./ChartCard";
// import OrdersTable from "../components/OrdersTable";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
import StatsCard from "./StatsCard";
import { ChartLine, DollarSign, ShoppingBag, User2 } from "lucide-react";
import { Orders } from "@/lib/types";

const Dashboard = ({ query }: { query: DashboardQuery[] }) => {
    const coustomers = new Set(query[0].order.order.map((order: Orders) => order.user_id))
    const uniqueCoustomers = coustomers.size
    return (
            <div className=" p-6 w-full space-y-6">
                {/* <Header /> */}

                {/* Stats Section */}
                <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-6">
                    <StatsCard title="Total Product" value={query[0].product} icon={<DollarSign />} />
                    <StatsCard title="Total Sales" value={<Currency price={query[0].sales} />} icon={<ShoppingBag />} />
                    <StatsCard title="Orders" value={query[0].order.count} icon={<ShoppingBag />} />
                    <StatsCard title="Customers" value={uniqueCoustomers} icon={<User2 />} />
                    <StatsCard title="Growth" value="+15%" icon={<ChartLine />} />
                </div>

                {/* Chart Section */}
                <ChartCard />

                {/* Orders Table */}
                {/* <OrdersTable /> */}
            </div>
    );
};

export default Dashboard;
