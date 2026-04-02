"use client";
import { Edit, Eye } from "lucide-react";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Connection, ConnectionEditInput } from "@/types/connection.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editConnectionSchema } from "@/schema/connection.schema";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { handleClientError } from "@/utils/handle-errors";
import { editConnectionAction } from "@/actions/connection";
import { useRouter } from "next/navigation";

export default function ConnectionEdit({
  connection,
}: {
  connection: Connection;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ConnectionEditInput>({
    defaultValues: {
      name: connection.name,
      uri: connection.uri,
      ssl: connection.ssl ?? false,
      type: connection.type,
    },
    resolver: zodResolver(editConnectionSchema),
  });

  const handleFormSubmit = async (payload: ConnectionEditInput) => {
    setIsLoading(true);
    try {
      const res = await editConnectionAction(connection.id, payload);
      if (!res.success) {
        return toast.error(res.error.message || "connection update failed!");
      }

      setIsEdit(false);
      router.refresh();
    } catch (error) {
      return handleClientError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full space-x-2.5">
      <form className="relative" onSubmit={handleSubmit(handleFormSubmit)}>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          title="Edit Connection"
          onClick={() => setIsEdit((prev) => !prev)}
          className="absolute right-0 -top-1"
        >
          <Edit /> Edit
        </Button>
        <FieldSet className="w-full">
          <FieldLegend>
            {isEdit ? "Edit Connection" : "Connection Details"}
          </FieldLegend>
          <FieldDescription>
            {isEdit
              ? "Update your database connection settings."
              : "View your database connection information."}
          </FieldDescription>

          <FieldGroup className="@container/field-group flex flex-col md:flex-row gap-4">
            <Input type="hidden" {...register("type")} />
            <Field>
              <FieldLabel htmlFor="name">Connection Name</FieldLabel>
              <Input
                id="name"
                type="text"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                readOnly={!isEdit}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="uri">Connection URI</FieldLabel>
              <Input
                id="uri"
                {...register("uri")}
                type="password"
                aria-invalid={errors.uri ? "true" : "false"}
                readOnly={!isEdit}
              />
              <FieldError>{errors.uri?.message}</FieldError>
            </Field>
          </FieldGroup>

          {isEdit && (
            <>
              <FieldGroup>
                <Field orientation="horizontal" className="justify-between">
                  {(connection.type === "pg" ||
                    connection.type === "mysql") && (
                    <div className="flex gap-3">
                      <Controller
                        name="ssl"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Switch
                            id="ssl"
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-invalid={fieldState.invalid}
                          />
                        )}
                      />
                      <Label htmlFor="ssl">SSL Required</Label>
                    </div>
                  )}
                  <div className="flex gap-3 flex-col min-[410px]:flex-row">
                    <Button size={"sm"} variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button size="sm" type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
            </>
          )}
        </FieldSet>
      </form>
    </section>
  );
}
