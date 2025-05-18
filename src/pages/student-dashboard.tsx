import { studentDetailsData } from '@/data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { UserIcon, ChartBarIcon, ChartPieIcon, LightBulbIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function StudentDashboard() {
  // 模拟当前登录的学生数据
  const currentStudent = studentDetailsData.students[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          个人成绩分析
        </h1>
      </div>

      {/* 学生基本信息 */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
              基本信息
            </h2>
            <dl className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">姓名</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{currentStudent.name}</dd>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">班级</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{currentStudent.class}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-blue-500" />
              成绩概览
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {currentStudent.scores.map((score) => (
                <div key={score.subject} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{score.subject}</span>
                    <div className="flex items-center">
                      <span className={clsx(
                        "text-sm font-medium",
                        score.score >= 90 ? "text-green-600" :
                        score.score >= 80 ? "text-blue-600" :
                        score.score >= 60 ? "text-yellow-600" :
                        "text-red-600"
                      )}>
                        {score.score}
                      </span>
                      {score.trend === 'up' ? (
                        <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="ml-1 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 成绩趋势图 */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
        {/* 历史成绩趋势 */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
            <PresentationChartLineIcon className="h-5 w-5 mr-2 text-blue-500" />
            历史成绩趋势
          </h2>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={currentStudent.recentScores}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="examName" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  label={{ 
                    value: '分数', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: 12, fill: '#6b7280' }
                  }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#3B82F6' }}
                  activeDot={{ r: 6, fill: '#2563EB' }}
                  name="总分"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 学科能力雷达图 */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
            <ChartPieIcon className="h-5 w-5 mr-2 text-blue-500" />
            学科能力分析
          </h2>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={currentStudent.scores.map((score) => ({
                  subject: score.subject,
                  score: score.score,
                }))}
                margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
              >
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 12, fill: '#4b5563' }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12, fill: '#4b5563' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Radar
                  name={currentStudent.name}
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.4}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 学习建议 */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
          <LightBulbIcon className="h-5 w-5 mr-2 text-blue-500" />
          学习建议
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentStudent.scores
            .filter((score) => score.score < 80)
            .map((score) => (
              <div key={score.subject} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
                      <span className="text-sm font-medium leading-none text-red-600">
                        {score.subject[0]}
                      </span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {score.subject}学科建议
                    </h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>
                        当前成绩{score.score}分，建议加强基础知识的学习，多做练习题，
                        可以参加课后辅导班提升成绩。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 