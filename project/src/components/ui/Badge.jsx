import { cn } from '@/lib/utils';

export function Badge({ status }) {
  return (
    <span
      className={cn(
        'px-2 py-1 text-xs font-medium rounded-full',
        status === 'pending' && 'bg-yellow-100 text-yellow-800',
        status === 'approved' && 'bg-green-100 text-green-800',
        status === 'rejected' && 'bg-red-100 text-red-800'
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}