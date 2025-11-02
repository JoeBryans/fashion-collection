"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4000 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 7000 },
];

const ChartCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-md mt-5">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default ChartCard;
