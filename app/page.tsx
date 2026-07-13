import KanbanBoard from '@/components/kanban/KanbanBoard';
import { KanbanSummaryCards } from '@/components/kanban/KanbanSummaryCards';
import type { BoardApplication } from '@/lib/application';
import { prisma } from '@/lib/prisma';
import { ClipboardList } from 'lucide-react';

function buildSummaryItems(applications: readonly BoardApplication[]) {
  const totalApplications = applications.length;
  const activeInterviews = applications.filter(
    (application) => application.status === 'Interview'
  ).length;
  const offersReceived = applications.filter(
    (application) => application.status === 'Offer'
  ).length;
  const respondedApplications = applications.filter(
    (application) =>
      application.status !== 'Rejected' && application.status !== 'Applied'
  ).length;
  const responseRate =
    totalApplications > 0
      ? `${Math.round((respondedApplications / totalApplications) * 100)}%`
      : '0%';

  return [
    {
      title: 'Total Applications' as const,
      value: String(totalApplications),
    },
    {
      title: 'Active Interviews' as const,
      value: String(activeInterviews),
    },
    {
      title: 'Offers Received' as const,
      value: String(offersReceived),
    },
    {
      title: 'Response Rate' as const,
      value: responseRate,
    },
  ];
}

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

  const summaryItems = buildSummaryItems(boardApplications);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-8">
      <KanbanSummaryCards items={summaryItems} />
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
