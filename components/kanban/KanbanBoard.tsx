'use client';

import React, { useState, useTransition } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  type DragEndEvent,
  type DragStartEvent,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddApplicationDialog from '@/components/forms/addApplicationDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateApplicationStatus } from '@/app/actions';
import type { ApplicationStatus, BoardApplication } from '@/lib/application';
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

interface ColumnDropZoneProps {
  column: (typeof columns)[number];
  cards: BoardApplication[];
  onCardClick: (application: BoardApplication) => void;
}

interface SortableApplicationCardProps {
  application: BoardApplication;
  onClick: () => void;
}

const KanbanBoard = ({ applications }: KanbanBoardProps) => {
  const [boardApplications, setBoardApplications] = useState<
    BoardApplication[]
  >(() => [...applications]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<BoardApplication | null>(null);
  const [activeApplication, setActiveApplication] =
    useState<BoardApplication | null>(null);
  const [, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleCardClick = (application: BoardApplication) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const handleApplicationSaved = (application: BoardApplication) => {
    setBoardApplications((currentApplications) => {
      const existingIndex = currentApplications.findIndex(
        (currentApplication) => currentApplication.id === application.id
      );

      if (existingIndex >= 0) {
        const nextApplications = [...currentApplications];
        nextApplications[existingIndex] = application;
        return nextApplications;
      }

      return [application, ...currentApplications];
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const draggedApplication = boardApplications.find(
      (application) => application.id === String(event.active.id)
    );

    if (draggedApplication) {
      setActiveApplication(draggedApplication);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveApplication(null);

    if (!over) {
      return;
    }

    const draggedId = String(active.id);
    const targetStatus = over.data.current?.status as
      ApplicationStatus | undefined;

    if (!targetStatus) {
      return;
    }

    const currentApplication = boardApplications.find(
      (application) => application.id === draggedId
    );

    if (!currentApplication || currentApplication.status === targetStatus) {
      return;
    }

    const nextApplications = boardApplications.map((application) =>
      application.id === draggedId
        ? { ...application, status: targetStatus }
        : application
    );

    setBoardApplications(nextApplications);
    startTransition(() => {
      void updateApplicationStatus(draggedId, targetStatus);
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-230 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => {
            const cards = boardApplications.filter(
              (application) => application.status === column.title
            );

            return (
              <ColumnDropZone
                key={column.title}
                column={column}
                cards={cards}
                onCardClick={handleCardClick}
              />
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
          onApplicationSaved={handleApplicationSaved}
        />
      </div>
      <DragOverlay>
        {activeApplication ? (
          <div className="w-72">
            <KanbanApplicationCard application={activeApplication} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const ColumnDropZone = ({
  column,
  cards,
  onCardClick,
}: ColumnDropZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.title,
    data: {
      status: column.title,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(isOver && 'rounded-xl ring-2 ring-sky-400/40')}
    >
      <Card className="h-full border border-slate-200/80 bg-slate-50/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn('h-2.5 w-2.5 rounded-full', column.dot)} />
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
            <SortableContext
              items={cards.map((application) => application.id)}
              strategy={verticalListSortingStrategy}
            >
              {cards.map((application) => (
                <SortableApplicationCard
                  key={application.id}
                  application={application}
                  onClick={() => onCardClick(application)}
                />
              ))}
            </SortableContext>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SortableApplicationCard = ({
  application,
  onClick,
}: SortableApplicationCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: application.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanApplicationCard application={application} onClick={onClick} />
    </div>
  );
};

export default KanbanBoard;
