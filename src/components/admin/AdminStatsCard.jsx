import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const AdminStatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  className,
  isLoading = false,
  trend = null // 'up', 'down', or null
}) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-3/4 mb-1" />
            {description && <Skeleton className="h-4 w-1/2" />}
          </>
        ) : (
          <>
            <div className="text-2xl font-bold flex items-center gap-2">
              {value}
              {trend === 'up' && (
                <span className="text-green-500 text-sm flex items-center">
                  ↑
                </span>
              )}
              {trend === 'down' && (
                <span className="text-red-500 text-sm flex items-center">
                  ↓
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Example usage:
/*
<AdminStatsCard
  title="Total Users"
  value={usersCount}
  icon={Users}
  description="+20% from last month"
  trend="up"
  isLoading={loading}
  className="border-blue-100 bg-blue-50"
/>
*/