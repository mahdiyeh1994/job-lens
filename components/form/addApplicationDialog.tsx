'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import ErrorMessage from '@/components/ui/errorMessage';
import {
  CalendarDaysIcon,
  Link2Icon,
  MapPinIcon,
  BriefcaseIcon,
  Building2Icon,
  FlagIcon,
} from 'lucide-react';

interface AddApplicationDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

const applicationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  status: z.enum(['Applied', 'Interview', 'Offer', 'Rejected']),
  dateApplied: z.string().optional().nullable(),
  salary: z.string().optional().nullable(),
  location: z.enum(['Remote', 'On-site', 'Hybrid']),
  jobUrl: z.url('Enter a valid URL').or(z.literal('')).optional(),
  nextStep: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof applicationSchema>;

export default function AddApplicationDialog({
  open,
  onOpenChange,
}: AddApplicationDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      companyName: '',
      jobTitle: '',
      status: 'Applied',
      dateApplied: '',
      salary: '',
      location: 'Remote',
      jobUrl: '',
      nextStep: '',
    },
  });

  const location = watch('location');

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);
  console.log(errors);
  const onSubmit = (values: FormValues) => {
    // onOpenChange(false);
    // reset();
    console.log('submited', values);
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:min-w-5xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-200/50 dark:bg-slate-950 dark:shadow-slate-950/40 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              Add New Job Application
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Track your application and stay organized across company, status,
              and next steps.
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
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      onValueChange={(val) => field.onChange(val)}
                      value={field.value}
                    >
                      <SelectTrigger className="h-full w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
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
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <MapPinIcon className="h-4 w-4" />
                Location / Work Type
              </div>
              <div className="flex flex-wrap gap-2">
                {['Remote', 'On-site', 'Hybrid'].map((option) => (
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
              <Button type="submit">Save Application</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
