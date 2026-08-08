'use client';

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import ErrorMessage from '@/components/ui/errorMessage';
import { saveApplication } from '@/app/actions';
import {
  applicationSchema,
  type ApplicationFormValues,
  type BoardApplication,
} from '@/lib/application';
import {
  CalendarDaysIcon,
  Link2Icon,
  MapPinIcon,
  BriefcaseIcon,
  Building2Icon,
  ChevronDownIcon,
  FlagIcon,
} from 'lucide-react';

interface AddApplicationDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly initialValues?: Partial<FormValues>;
  readonly editingId?: string;
  readonly onApplicationSaved?: (application: BoardApplication) => void;
}

type FormValues = ApplicationFormValues;

const buildDefaultValues = (values?: Partial<FormValues>): FormValues => ({
  companyName: values?.companyName ?? '',
  jobTitle: values?.jobTitle ?? '',
  status: values?.status ?? 'Applied',
  dateApplied: values?.dateApplied ?? '',
  salary: values?.salary ?? '',
  location: values?.location ?? 'Remote',
  jobUrl: values?.jobUrl ?? '',
  nextStep: values?.nextStep ?? '',
});

export default function AddApplicationDialog({
  open,
  onOpenChange,
  initialValues,
  editingId,
  onApplicationSaved,
}: AddApplicationDialogProps) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: buildDefaultValues(initialValues),
  });

  const location = useWatch({
    control,
    name: 'location',
  });
  const locationOptions: ApplicationFormValues['location'][] = [
    'Remote',
    'On-site',
    'Hybrid',
  ];

  useEffect(() => {
    if (!open) {
      reset(buildDefaultValues());
      return;
    }

    reset(buildDefaultValues(initialValues));
  }, [open, reset, initialValues]);

  const isEditing = Boolean(editingId);

  const normalizeSavedApplication = (application: {
    id: string;
    companyName: string;
    jobTitle: string;
    status: string;
    dateApplied?: string | null;
    salary?: string | null;
    location?: string | null;
    jobUrl?: string | null;
    nextStep?: string | null;
  }): BoardApplication => ({
    id: application.id,
    companyName: application.companyName,
    jobTitle: application.jobTitle,
    status: (application.status as BoardApplication['status']) ?? 'Applied',
    dateApplied: application.dateApplied ?? '',
    salary: application.salary ?? '',
    location:
      (application.location as BoardApplication['location']) ?? 'Remote',
    jobUrl: application.jobUrl ?? '',
    nextStep: application.nextStep ?? '',
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const savedApplication = await saveApplication(values, editingId);
      console.log('Saved application:', savedApplication);

      const normalizedApplication = normalizeSavedApplication(savedApplication);
      onApplicationSaved?.(normalizedApplication);
      onOpenChange(false);
      reset(buildDefaultValues());
      router.refresh();
    } catch (error) {
      console.error('Failed to save application', error);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset(buildDefaultValues());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:min-w-5xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-200/50 dark:bg-slate-950 dark:shadow-slate-950/40 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              {isEditing ? 'Edit Job Application' : 'Add New Job Application'}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              {isEditing
                ? 'Update the details for this application and keep your board in sync.'
                : 'Track your application and stay organized across company, status, and next steps.'}
            </DialogDescription>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <Building2Icon className="h-4 w-4" />
                Company Name <span className="text-slate-400">*</span>
              </span>
              <Input
                placeholder="e.g. Digikala, Shopify, Vercel"
                {...register('companyName', { required: true })}
              />
              <ErrorMessage>{errors.companyName?.message}</ErrorMessage>
            </label>

            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <BriefcaseIcon className="h-4 w-4" />
                Job Title / Position <span className="text-slate-400">*</span>
              </span>
              <Input
                placeholder="e.g. Senior Frontend Developer"
                {...register('jobTitle', { required: true })}
              />
              <ErrorMessage>{errors.jobTitle?.message}</ErrorMessage>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Application Status <span className="text-slate-400">*</span>
              </span>
              <div>
                <div className="relative w-full">
                  <select
                    {...register('status')}
                    className="flex h-11 w-full appearance-none items-center justify-between gap-1.5 rounded-lg border border-border-light bg-transparent px-9 py-2.5 pr-12 text-sm whitespace-nowrap text-slate-900 transition-colors outline-none select-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:text-slate-100 dark:hover:bg-input/50"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <ErrorMessage>{errors.status?.message}</ErrorMessage>
              </div>
            </label>

            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <CalendarDaysIcon className="h-4 w-4" />
                Date Applied
              </span>
              <Input type="date" {...register('dateApplied')} />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Salary / Compensation{' '}
                <span className="text-slate-400 text-xs">(optional)</span>
              </span>
              <Input
                placeholder="e.g. $80,000 – $100,000 or Negotiable"
                {...register('salary')}
              />
            </label>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <MapPinIcon className="h-4 w-4" />
                Location / Work Type
              </label>
              <div className="flex flex-wrap gap-2">
                {locationOptions.map((option) => (
                  <Button
                    key={option}
                    variant={location === option ? 'default' : 'outline'}
                    size="sm"
                    type="button"
                    onClick={() =>
                      setValue('location', option, {
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                    className={
                      location === option ? 'bg-primary text-white' : ''
                    }
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <Link2Icon className="h-4 w-4" />
                Job Posting URL{' '}
                <span className="text-slate-400 text-xs">(optional)</span>
              </span>
              <Input placeholder="https://..." {...register('jobUrl')} />
              <ErrorMessage>{errors.jobUrl?.message}</ErrorMessage>
            </label>

            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <FlagIcon className="h-4 w-4" />
                Next Step / Reminder{' '}
                <span className="text-slate-400 text-xs">(optional)</span>
              </span>
              <Input
                placeholder="e.g. Send portfolio by Friday"
                {...register('nextStep')}
              />
            </label>
          </div>

          <DialogFooter className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Save Changes' : 'Save Application'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
