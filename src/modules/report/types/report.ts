import z from "zod";
import { reportSchema } from "@/modules/report/schema/report";

export type ReportPayload = z.infer<typeof reportSchema> & {
  submittedOn: string | Date;
};