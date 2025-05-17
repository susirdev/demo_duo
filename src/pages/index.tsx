import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import StatCard from '@/components/ui/StatCard';
import { overviewData } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">总览</h1>
      </div>
      
      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="平均分"
          value={overviewData.keyMetrics.averageScore.toFixed(1)}
          icon={<AcademicCapIcon className="h-6 w-6 text-blue-600" />}
          description="全校平均分"
          trend={{ value: 2.5, isPositive: true }}
        />
        <StatCard
          title="及格率"
          value={`${overviewData.keyMetrics.passRate}%`}
          icon={<ChartBarIcon className="h-6 w-6 text-green-600" />}
          description="全校及格率"
          trend={{ value: 1.2, isPositive: true }}
        />
        <StatCard
          title="优秀率"
          value={`${overviewData.keyMetrics.excellentRate}%`}
          icon={<StarIcon className="h-6 w-6 text-yellow-600" />}
          description="全校优秀率"
          trend={{ value: 0.8, isPositive: false }}
        />
        <StatCard
          title="学生总数"
          value={overviewData.keyMetrics.totalStudents}
          icon={<UserGroupIcon className="h-6 w-6 text-purple-600" />}
          description="在校学生人数"
        />
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 各学科平均分对比 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-6">各学科平均分对比</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={overviewData.subjectAverages}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: '分数', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: 12 }
                  }}
                />
                <Tooltip />
                <Bar 
                  dataKey="score" 
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 最近考试趋势 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-6">最近考试趋势</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={overviewData.recentExams}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="examName" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: '平均分', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: 12 }
                  }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="averageScore" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
