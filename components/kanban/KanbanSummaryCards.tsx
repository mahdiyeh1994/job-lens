import { Card, CardContent } from '@/components/ui/card';
import type { BoardApplication } from '@/lib/application';

type Title =
  | 'Total Applications'
  | 'Active Interviews'
  | 'Offers Received'
  | 'Response Rate';
interface SummaryCardItem {
  value: string;
  title: Title;
}

export function buildSummaryItems(applications: readonly BoardApplication[]) {
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
      value: String(responseRate),
    },
  ];
}

interface KanbanSummaryCardsProps {
  items: readonly SummaryCardItem[];
}

function getAccentClasses(title: Title) {
  if (title === 'Total Applications') {
    return {
      bar: 'bg-gray-500',
      text: 'text-gray-600',
    };
  } else if (title === 'Active Interviews') {
    return {
      bar: 'bg-amber-500',
      text: 'text-amber-600',
    };
  } else if (title === 'Offers Received') {
    return {
      bar: 'bg-emerald-500',
      text: 'text-emerald-600',
    };
  } else {
    return {
      bar: 'bg-blue-500',
      text: 'text-blue-600',
    };
  }
}

export function KanbanSummaryCards({
  items,
}: Readonly<KanbanSummaryCardsProps>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const accent = getAccentClasses(item.title);

        return (
          <Card
            key={item.title}
            className="border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur"
          >
            <CardContent className="p-5">
              <div className="mt-4">
                <p
                  className={`mt-1 text-2xl font-semibold tracking-tight ${accent.text}`}
                >
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{item.title}</p>
              </div>
              <div className={`mt-3 h-2 w-16 rounded ${accent.bar}`} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
