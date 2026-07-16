import KanbanBoard from '@/components/kanban/KanbanBoard';
import type { BoardApplication } from '@/lib/application';
import { prisma } from '@/lib/prisma';
import { ClipboardList } from 'lucide-react';

export default async function Home() {
  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  const boardApplications: BoardApplication[] = applications.map(
    (application) => ({
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
    })
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-8">
      <div className="my-3 flex items-center">
        <ClipboardList className="mr-2 h-5 w-5 text-slate-500" />
        <h2 className="text-xl font-semibold text-slate-900">
          Application Board
        </h2>
      </div>
      <KanbanBoard applications={boardApplications} />
    </main>
  );
}
