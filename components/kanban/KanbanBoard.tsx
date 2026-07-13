'use client';

import React, { useState } from 'react';
import AddApplicationDialog from '@/components/forms/addApplicationDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BoardApplication } from '@/lib/application';
import { cn } from '@/lib/utils';
import KanbanApplicationCard from './KanbanApplicationCard';

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

interface KanbanBoardProps {
  applications: readonly BoardApplication[];
}

const KanbanBoard = ({ applications }: KanbanBoardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<BoardApplication | null>(null);

  const handleCardClick = (application: BoardApplication) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid min-w-230 gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                    <KanbanApplicationCard
                      key={`${application.companyName}-${application.jobTitle}`}
                      application={application}
                      onClick={() => handleCardClick(application)}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <AddApplicationDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSelectedApplication(null);
          }
        }}
        initialValues={selectedApplication ?? undefined}
        editingId={selectedApplication?.id}
      />
    </div>
  );
};
export default KanbanBoard;
