import { cn } from "@/lib/utils"

export function LeadStageBadge({
  stage
}) {
  const colorMap = {
    'new': 'bg-blue-100 text-blue-800',
    'contacted': 'bg-yellow-100 text-yellow-800',
    'interested': 'bg-green-100 text-green-800',
    'qualified': 'bg-purple-100 text-purple-800',
    'in-progress': 'bg-orange-100 text-orange-800',
    'closed won': 'bg-green-100 text-green-800',
    'closed lost': 'bg-red-100 text-red-800'
  }

  return (
    (<span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colorMap[stage]
      )}>
      {stage}
    </span>)
  );
}

