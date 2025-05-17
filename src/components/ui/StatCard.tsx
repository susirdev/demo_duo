import { ReactNode } from 'react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon, description, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex items-center">
        {icon && (
          <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
            {icon}
          </div>
        )}
        <div className={clsx("w-full", icon ? "ml-4" : "")}>
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <span
                className={clsx(
                  "ml-2 flex items-baseline text-sm font-semibold",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                <span className="inline-flex items-center">
                  {trend.isPositive ? (
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {Math.abs(trend.value)}%
                </span>
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
} 