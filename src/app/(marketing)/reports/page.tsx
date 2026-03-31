"use client";
import { sendReportAction } from "@/actions/report";
import SectionLayout from "@/components/common/section-layout";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { reportSchema } from "@/schema/report.schema";
import { handleClientError } from "@/utils/handle-errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportBugFeaturePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const handleFormSubmit = async (payload: ReportFormValues) => {
    setIsLoading(true);
    try {
      const res = await sendReportAction({
        ...payload,
        submittedOn: new Date().toLocaleString(),
      });
      if (res.success) {
        toast.success("Thank you!🙏", {
          description: `${payload.type} report submitted successfully.`,
        });
        reset();
      }
    } catch (error) {
      return handleClientError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <SectionLayout
        title="Report Bug & Feature"
        description="Help us improve QueryMate."
        actionUI={
          <Button
            type="button"
            size={"sm"}
            variant={"default"}
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Back
          </Button>
        }
      >
        <section className="w-full max-w-md mx-auto my-8">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Send a Report</FieldLegend>
                <FieldDescription>
                  All reports are reviewed by the QueryMate team.
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      id="title"
                      type="text"
                      {...register("title")}
                      placeholder="Brief summary of the issue or idea"
                    />
                    <FieldDescription>
                      Keep it short and descriptive.
                    </FieldDescription>
                    <FieldError>{errors.title?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Type</FieldLabel>

                    <Controller
                      name="type"
                      control={control}
                      defaultValue="feature"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="feature">
                              Feature Request
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldDescription>
                      Reporting a problem or suggesting an improvement?
                    </FieldDescription>
                    <FieldError>{errors.type?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Describe the bug or feature in detail..."
                      rows={4}
                    />
                    <FieldDescription>
                      Be as detailed as possible.
                    </FieldDescription>
                    <FieldError>{errors.message?.message}</FieldError>
                  </Field>
                  <Field>
                    <Button type="submit">
                      {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </section>
      </SectionLayout>
    </div>
  );
}
