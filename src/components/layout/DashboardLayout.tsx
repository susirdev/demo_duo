import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ChartPieIcon,
  DocumentTextIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { userType, isLoggedIn, logout } = useAuth();

  // 根据用户类型显示不同的导航项
  const navigation = userType === 'teacher' 
    ? [
        { name: '班级概览', href: '/', icon: ChartBarIcon },
        { name: '班级分析', href: '/class-analysis', icon: ChartPieIcon },
        { name: '学生详情', href: '/student-details', icon: UserGroupIcon },
      ]
    : [
        { name: '个人成绩', href: '/student-dashboard', icon: ChartBarIcon },
        { name: '考试记录', href: '/student-exams', icon: DocumentTextIcon },
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm fixed w-full z-10 border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              {isLoggedIn && (
                <button
                  type="button"
                  className="lg:hidden -ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">打开侧边栏</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              )}
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1 sm:p-2 rounded-lg shadow-md">
                  <AcademicCapIcon className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                <span className="ml-1.5 sm:ml-3 text-sm sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  学科成绩分析系统
                </span>
              </div>
            </div>
            {isLoggedIn && (
              <div className="flex items-center space-x-1.5 sm:space-x-4">
                <span className="inline-flex items-center px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm">
                  {userType === 'teacher' ? '教师端' : '学生端'}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-1.5 sm:px-4 py-1 sm:py-2 border border-transparent text-[10px] sm:text-sm font-medium rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <ArrowRightOnRectangleIcon className="h-3.5 w-3.5 sm:h-5 sm:w-5 mr-0.5 sm:mr-2 text-gray-500" />
                  退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 移动端侧边栏 */}
      {isLoggedIn && (
        <div
          className={clsx(
            'fixed inset-0 z-20 lg:hidden',
            sidebarOpen ? 'block' : 'hidden'
          )}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1 sm:p-2 rounded-lg shadow-md">
                  <AcademicCapIcon className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                <span className="ml-1.5 sm:ml-3 text-sm sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  学科成绩分析系统
                </span>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">关闭侧边栏</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pt-5 pb-4">
              <nav className="mt-5 px-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow'
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={clsx(
                          isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 h-6 w-6 transition-colors duration-200'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* 桌面端侧边栏 */}
      {isLoggedIn && (
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-16">
              <nav className="flex-1 space-y-1 px-4 py-4">
                {navigation.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow'
                      )}
                    >
                      <item.icon
                        className={clsx(
                          isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 h-6 w-6 transition-colors duration-200'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* 主内容区 */}
      <div className={clsx(isLoggedIn ? 'lg:pl-72' : '')}>
        <main className="min-h-screen pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 