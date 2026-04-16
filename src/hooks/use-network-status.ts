import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState<boolean>(true);

    useEffect(() => {
        // initial state 
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => {
            toast.info("You are currently offline");
            setIsOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [])
    return !!isOnline;
}