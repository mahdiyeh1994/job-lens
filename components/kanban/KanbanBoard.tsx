import React from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const columns = [
  {
    title: 'Applied',
    description: 'New submissions waiting for a response.',
    accent: 'bg-sky-500/10 text-sky-700 border-sky-200',
    dot: 'bg-sky-500',
  },
  {
    title: 'Interview',
    description: 'Conversations and technical screens.',
    accent: 'bg-amber-500/10 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  {
    title: 'Offer',
    description: 'Exciting opportunities you are evaluating.',
    accent: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  {
    title: 'Rejected',
    description: 'Archived outcomes and lessons learned.',
    accent: 'bg-rose-500/10 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
  },
] as const;

const applications = [
  {
    companyName: 'Vercel',
    jobTitle: 'Senior Product Designer',
    status: 'Applied',
    dateApplied: 'Jun 10',
    location: 'Remote',
    salary: '$165k - $195k',
  },
  {
    companyName: 'Linear',
    jobTitle: 'Frontend Engineer',
    status: 'Interview',
    dateApplied: 'Jun 08',
    location: 'Hybrid',
    salary: '$140k - $170k',
  },
  {
    companyName: 'Notion',
    jobTitle: 'Staff Engineer',
    status: 'Interview',
    dateApplied: 'Jun 01',
    location: 'On-site',
    salary: '$180k - $220k',
  },
  {
    companyName: 'Figma',
    jobTitle: 'Design Systems Lead',
    status: 'Offer',
    dateApplied: 'May 24',
    location: 'Remote',
    salary: '$190k - $230k',
  },
  {
    companyName: 'Stripe',
    jobTitle: 'Platform Engineer',
    status: 'Rejected',
    dateApplied: 'May 17',
    location: 'Remote',
    salary: '$160k - $200k',
  },
];

const KanbanBoard = () => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid min-w-230 gap-4 xl:grid-cols-4 md:grid-cols-2">
        {columns.map((column) => {
          const cards = applications.filter(
            (application) => application.status === column.title
          );

          return (
            <Card
              key={column.title}
              className="border border-slate-200/80 bg-slate-50/70 shadow-sm"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn('h-2.5 w-2.5 rounded-full', column.dot)}
                    />
                    <CardTitle className="text-sm font-semibold text-slate-900">
                      {column.title}
                    </CardTitle>
                  </div>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-[11px] font-medium',
                      column.accent
                    )}
                  >
                    {cards.length}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{column.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {cards.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4 text-center text-sm text-slate-400">
                    No applications here yet.
                  </div>
                ) : (
                  cards.map((application) => (
                    <div
                      key={`${application.companyName}-${application.jobTitle}`}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            {application.companyName}
                          </div>
                          <p className="mt-1 text-sm text-slate-600">
                            {application.jobTitle}
                          </p>
                        </div>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          className="shrink-0"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {application.dateApplied}
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                          <BriefcaseBusiness className="h-3.5 w-3.5" />
                          {application.location}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Clock3 className="h-4 w-4 text-slate-400" />
                          {application.salary}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default KanbanBoard;
