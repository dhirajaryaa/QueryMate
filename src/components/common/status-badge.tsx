import { Badge } from "../ui/badge";

type Props = {
    status: "active" | "pending" | "issus";
}
export default function StatusBadge({ status }: Props) {

    const colors: Record<string, string> = {
        active: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        issus: "bg-red-100 text-red-700",
    }

    return (
        <Badge className={`capitalize ${colors[status.toLowerCase()]}`}>
            {status}
        </Badge>
    )
}