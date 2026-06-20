import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ToolUIPart } from "ai";
import { Circle, CircleCheckBig, CircleX, Clock, Wrench } from "lucide-react";


type Props = {
    part: ToolUIPart;
};

export function Tool({ part }: Props) {

    const status: any = {
        "input-streaming": <><Circle className="text-muted" />Penning</>,
        "input-available": <><Clock />Running</>,
        "output-available": <><CircleCheckBig className="text-green-500" />Completed</>,
        "output-error": <><CircleX className="text-destructive" />Error</>
    }

    return (
        <AccordionItem value={part.toolCallId} >
            <AccordionTrigger className="sm:py-3">
                <div className="flex items-center gap-3 flex-1">
                    <Wrench size={16} />
                    {part.title}
                </div>
                    <Badge className="ml-3 items-center" variant={"secondary"}>
                        {status[part.state]}
                    </Badge>
            </AccordionTrigger>

            <AccordionContent >
                <pre className="w-full bg-muted/60 rounded-xl p-4">
                    Output: {JSON.stringify(part.output, null, 2)}
                </pre>
                {
                    part.errorText && <p className="text-destructive">{part.errorText}</p>
                }
            </AccordionContent>
        </AccordionItem>
    );
}