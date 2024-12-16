import { cn } from "@/lib/utils"

export function LeadStageBadge({
  stage
}) {
  const colorMap = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-yellow-100 text-yellow-800',
    'Interested': 'bg-green-100 text-green-800',
    'Qualified': 'bg-purple-100 text-purple-800',
    'In Progress': 'bg-orange-100 text-orange-800',
    'Closed Won': 'bg-green-100 text-green-800',
    'Closed Lost': 'bg-red-100 text-red-800'
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

