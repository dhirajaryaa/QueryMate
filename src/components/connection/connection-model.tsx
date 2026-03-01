import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, ShieldCheck, Zap } from "lucide-react";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DBTypeSelect from "./dbtype-select";
import { Switch } from "../ui/switch";
import { Controller, useForm } from "react-hook-form";
import { connectionSchema } from "@/schema/connection.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectionInput } from "@/types/connection.types";
import { createNewConnection } from "@/actions/connection";
import { toast } from "sonner";


export function ConnectionModel() {
    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<ConnectionInput>({
        mode: "onBlur",
        defaultValues: {
            type: "pg",
            name: "",
            ssl: false,
            uri: ""
        },
        resolver: zodResolver(connectionSchema)
    });

    const handleFormSubmit = async (payload: ConnectionInput) => {
        const res = await createNewConnection(payload);
        if (!res.success) {
            return toast.error(res.error || "connection create failed!")
        };
        reset();
    };

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button size={'sm'}>
                    <Plus className="mr-1" size={16} />
                    New Connection
                </Button>
            </DialogTrigger>
            <DialogContent >
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>New Connection</DialogTitle>
                        <DialogDescription>
                            Add your database connection details.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Database Type */}
                    <Field>
                        <Label>
                            Database Type <span className="text-destructive">*</span>
                        </Label>

                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <DBTypeSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                    </Field>
                    <FieldGroup>
                        {/* Connection Name */}
                        <Field>
                            <Label htmlFor="name">
                                Connection Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register("name")}
                                placeholder="Production DB"
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            <FieldError>
                                {errors.name?.message}
                            </FieldError>
                        </Field>
                        {/* URI */}
                        <Field>
                            <Label htmlFor="uri">
                                Connection URI <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register("uri")}
                                placeholder="postgresql://user:pass@host:5432/db"
                                type="password"
                                aria-invalid={errors.uri ? "true" : "false"}
                            />
                            <FieldError>
                                {errors.uri?.message}
                            </FieldError>
                        </Field>
                    </FieldGroup>
                    {/* SSL Toggle */}
                    <Field className="flex items-center justify-between flex-row border-dashed py-4 px-2 my-4 border rounded-md">
                        <Label htmlFor="ssl">
                            <span>
                                <ShieldCheck size={18} className="text-primary" />
                            </span>
                            SSL Required
                        </Label>
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
                    </Field>
                    <DialogFooter className="justify-between sm:justify-between flex-col sm:flex-row">
                        <Button type="button" variant={'secondary'}>
                            <Zap fill="currentColor" className="text-yellow-500" />
                            Test Connection</Button>
                        <div className="space-x-2">
                            <Button type="submit" className="w-full">Save changes</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
