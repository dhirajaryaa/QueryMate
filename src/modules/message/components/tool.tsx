import {
    Accordion,
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
        "output-error": <><CircleX className="text-red-500" />Error</>
    }

    return (
        <Accordion type="single" collapsible className="bg-muted/60 p-2 rounded-xl">
            <AccordionItem value={part.toolCallId} >
                <AccordionTrigger>
                    <div className="flex items-center gap-3">
                        <Wrench size={16} />
                        {part.title}
                        <Badge className="ml-3 items-center" variant={"secondary"}>
                            {status[part.state]}
                        </Badge>
                    </div>
                </AccordionTrigger>

                <AccordionContent >
                    <pre className="w-full">
                        {JSON.stringify(part.output, null, 2)}
                    </pre>
                    {
                        part.errorText && <p className="text-red-500">{part.errorText}</p>
                    }
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}