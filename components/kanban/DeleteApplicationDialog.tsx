'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import type { BoardApplication } from '@/lib/application';

interface DeleteApplicationDialogProps {
  open: boolean;
  application?: BoardApplication | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteApplicationDialog = ({
  open,
  application,
  onOpenChange,
  onConfirm,
}: DeleteApplicationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl shadow-slate-200/50">
        <div className="space-y-3">
          <DialogTitle className="text-lg font-semibold text-slate-900">
            Confirm delete
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            {application ? (
              <>
                Are you sure you want to delete the application for{' '}
                <span className="font-semibold text-slate-900">
                  {application.companyName}
                </span>{' '}
                - {application.jobTitle}?
              </>
            ) : (
              'Are you sure you want to delete this application?'
            )}
          </DialogDescription>
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="button" variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteApplicationDialog;
