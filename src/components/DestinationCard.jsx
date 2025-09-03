import { Link } from "react-router-dom";


export default function DestinationCard({ destination }) {
return (
<div className="bg-white rounded-lg shadow p-4">
<img
src={destination.image}
alt={destination.name}
className="w-full h-40 object-cover rounded"
/>
<h2 className="mt-2 font-semibold">{destination.name}</h2>
<Link
to={`/destination/${destination.id}`}
className="text-blue-500 hover:underline text-sm"
>
View Details
</Link>
</div>
);
}