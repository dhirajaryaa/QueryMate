"use client";
import { Loader2, ShieldAlertIcon, Trash2, Trash2Icon } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleClientError } from "@/utils/handle-errors";
import { connectionDeleteAction } from "@/actions/connection";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function ConnectionDangerZone() {
  const { connId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await connectionDeleteAction(connId as string);
      
      if (res.success) {
        toast.warning("Connection Delete Successfully");
        router.push("/connections");
      }
    } catch (error) {
      return handleClientError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Item
        variant="outline"
        className="border-destructive bg-destructive/10 text-destructive"
      >
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>

        <ItemContent>
          <ItemTitle>Danger Zone</ItemTitle>
          <ItemDescription>Delete this connection permanently.</ItemDescription>
        </ItemContent>

        <ItemActions>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this connection?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The connection and its saved
                  settings will be permanently removed from your account.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant={"destructive"}
                  onClick={handleDelete}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                  Delete Connection
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ItemActions>
      </Item>
    </div>
  );
}

export default ConnectionDangerZone;
