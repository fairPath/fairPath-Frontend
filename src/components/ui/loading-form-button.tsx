import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LoadingFormBtn({
  message,
  label,
  pending,
}: {
  message?: string;
  label?: string;
  pending?: boolean;
}) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn('relative min-w-[100px] transition-all duration-200')}
    >
      {/* Label text */}
      <span
        className={cn(
          'flex items-center justify-center transition-all duration-200',
          pending ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        )}
      >
        {label}
      </span>

      {/* Loading state - positioned absolutely */}
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center gap-2 transition-all duration-200',
          pending ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current border-t-transparent"></div>
        <span className="font-medium">{message}</span>
      </span>
    </Button>
  );
}
