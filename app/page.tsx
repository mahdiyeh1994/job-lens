import react from 'react';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import { KanbanSummaryCards } from '@/components/kanban/KanbanSummaryCards';
import { ClipboardList } from 'lucide-react';

const summaryItems = [
  {
    title: 'Total Applications',
    value: '24',
  },
  {
    title: 'Active Interviews',
    value: '6',
  },
  {
    title: 'Offers Received',
    value: '2',
  },
  {
    title: 'Response Rate',
    value: '75%',
  },
] as const;

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-8">
      <KanbanSummaryCards items={summaryItems} />
      <div className="flex items-center my-3">
        <ClipboardList className="mr-2 h-5 w-5 text-slate-500" />
        <h2 className="text-xl font-semibold text-slate-900">
          Application Board
        </h2>
      </div>
      <KanbanBoard />
    </main>
  );
}
