import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

type Props = {
    title: string;
    value?: string | number;
    icon: LucideIcon;
    className?: string;
    iconClassName?: string;
};

function StatusCard({
    title,
    value = 0,
    icon: Icon,
    className,
    iconClassName
}: Props) {

    return (
        <Card className={cn("shadow-sm max-w-[220px] w-full p-1.5", className)}>
            <CardContent className="flex items-center gap-4 p-2 w-full max-w-sm">
                <Icon
                    className={cn(
                        "w-9 h-9 p-2 rounded-full text-primary",
                        iconClassName
                    )}
                />
                <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        {title}
                    </p>
                    <p className="text-xl font-bold">
                        {value}
                    </p>
                </div>

            </CardContent>

        </Card>
    );
}

export default StatusCard;