import ConnectionCard from "./connection-card";
import EmptyConnection from "./empty-connection";
import { Connection } from "@/types/connection.types";

export default function ListAllConnection({ connections }: { connections: Connection[] }) {

    if (!connections.length) {
        return (<EmptyConnection />)
    }

    return (
        <>
            <div className="flex flex-col gap-2">
                {
                    connections?.map(connection => <ConnectionCard connection={connection} key={connection.id} />)
                }
            </div>
        </>
    );
};