'use client';

import { useState } from 'react';
import { Download, FilePlus, MoreHorizontalIcon, Search, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { deleteResume, downloadResume, requestPresignUrl } from '@/app/dashboard/profile/action';
import { ResumePresignUrlResponse } from '@/types/ResumePresignUrlResponse';
import { toast } from 'sonner';
import SubmitButton from './../ui/submitbutton';

export function ResumeDropdown() {
  const [showNewDialog, setShowNewDialog] = useState(false);

  async function uploadResume(formData: FormData, data: ResumePresignUrlResponse) {
    try {
      const response = await fetch(data.presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/pdf',
        },
        body: formData.get('file') as File, // Ensure the body contains the file content
      });

      if (response.ok) {
        //after updating refresh page and also send confirm backend request to update table
      } else {
        console.error('Failed to upload resume');
      }
    } catch (error) {
      console.error('Error during resume upload:', error);
    }
  }

  async function handleDeleteResume() {
    //cud operations use actions
    const result = await deleteResume();
    if (result.ok) {
      toast.success('Resume deleted successfully');
    } else {
      toast.error(`Failed to delete resume: ${result.error}`);
    }
  }

  async function handleDownloadResume() {
    //since we are reading we use route
    try {
      const res = await fetch('/api/dashboard/profile/resume', {
        method: 'GET',
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        toast.error(data?.error ?? 'Failed to start resume download');
        return;
      }
      window.open(data?.url);
      toast.success('Resume download started');
    } catch (err) {
      toast.error('Network error while downloading resume');
    }
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>File Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
              Upload New File..
              <DropdownMenuShortcut>
                <FilePlus className="text-foreground" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDownloadResume}>
              Download
              <DropdownMenuShortcut>
                <Download className="text-foreground" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDeleteResume} variant="destructive">
              Delete
              <DropdownMenuShortcut>
                <Trash className="text-destructive" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <form
            action={async (formData) => {
              const res = await requestPresignUrl(formData);
              if (res?.ok) {
                uploadResume(formData, res.data);
                toast.success('Resume uploaded successfully');
                setShowNewDialog(false);
              }
            }}
          >
            <FieldGroup className="pb-3">
              <Field>
                <FieldLabel htmlFor="file">File</FieldLabel>
                <Input name="file" id="file" type="file" accept=".pdf,application/pdf" required />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <SubmitButton message={'Uploading...'} label={'Upload'} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
