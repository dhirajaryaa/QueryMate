"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { DBType } from "@/types/connection.types";
import DBTypeSelect from "./dbtype-select";


export function ConnectionModel() {
    const [dbType, setDbType] = useState<DBType>("pg");

    return (
        <Dialog defaultOpen={true}>
            <form>
                <DialogTrigger asChild>
                    <Button size={'sm'}>
                        <Plus className="mr-1" size={16} />
                        New Connection
                    </Button>
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>New Connection</DialogTitle>
                        <DialogDescription>
                            Add your database connection details.
                        </DialogDescription>
                    </DialogHeader>
                    {/* db type select */}
                    <DBTypeSelect value={dbType} onChange={setDbType} />
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </Field>
                        <Field>
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="sm:justify-between flex-row ">
                        <Button type="button" variant={'secondary'}>Test Connection</Button>
                        <div className="space-x-2">
                            <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
