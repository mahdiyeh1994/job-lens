import React from 'react';
import {
  Building2,
  CalendarDays,
  DollarSign,
  MapPin,
  Trash2,
} from 'lucide-react';
import type { BoardApplication } from '@/lib/application';
import { Button } from '../ui/button';

interface Props {
  application: BoardApplication;
  onClick?: () => void;
  onDelete?: () => void;
}

const KanbanApplicationCard = ({ application, onClick, onDelete }: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      key={`${application.companyName}-${application.jobTitle}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Building2 className="h-4 w-4 text-slate-400" />
            {application.companyName}
          </div>
          <p className="mt-1 text-sm text-slate-600">{application.jobTitle}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDeleteClick}
          aria-label={`Delete application for ${application.companyName}`}
          className="text-red-500"
        >
          <Trash2 />
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
          <CalendarDays className="h-3.5 w-3.5" />
          {application.dateApplied || 'Not provided'}
        </div>
        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
          <MapPin className="h-3.5 w-3.5" />
          {application.location}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <DollarSign className="h-4 w-4 text-slate-400" />
          {application.salary || 'Pending'}
        </div>
      </div>
    </div>
  );
};

export default KanbanApplicationCard;
