import { DatabaseSearch } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex text-primary items-center space-x-2 my-4 justify-center">
           < DatabaseSearch />
            <span className="text-xl font-bold">QueryMate</span>
        </div>
    );
}