
interface Props{
    title:string
    value:number|string|React.ReactNode
    icon:React.ReactNode
}
const StatsCard = ({ title, value, icon }:Props) => (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-start justify-between gap-4 w-max ">
        <div className="">
            <p className="text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className="text-blue-600 text-3xl">{icon}</div>
    </div>
);

export default StatsCard;
