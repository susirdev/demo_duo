import { useState } from 'react';
import { classAnalysisData, subjects } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export default function ClassAnalysis() {
  const [selectedClass, setSelectedClass] = useState(classAnalysisData.classAverages[0].className);

  const selectedClassData = classAnalysisData.classAverages.find(
    (c) => c.className === selectedClass
  );

  const selectedClassDistribution = classAnalysisData.classDistributions.find(
    (c) => c.className === selectedClass
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          班级分析
        </h1>
        <div className="mt-4 sm:mt-0">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <AcademicCapIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="block w-full min-w-[200px] rounded-xl border-2 border-blue-100 pl-10 pr-10 py-3 text-base font-semibold bg-white shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-blue-200 text-blue-700 cursor-pointer"
            >
              {classAnalysisData.classAverages.map((c) => (
                <option 
                  key={c.className} 
                  value={c.className} 
                  className="py-3 text-blue-700 font-semibold bg-white hover:bg-blue-50"
                >
                  {c.className}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 班级成绩对比 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 班级间成绩对比 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-6">班级间成绩对比</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={classAnalysisData.classAverages}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="className" 
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
                <Legend />
                {subjects.slice(0, 3).map((subject, index) => (
                  <Bar
                    key={subject}
                    dataKey={`scores.${index}.score`}
                    name={subject}
                    fill={
                      subject === '语文' ? '#E53E3E' : // 红色系
                      subject === '数学' ? '#3182CE' : // 蓝色系
                      '#38A169' // 绿色系（英语）
                    }
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 班级成绩分布 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-6">班级成绩分布</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={selectedClassDistribution?.distribution}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="range" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: '学生人数', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: 12 }
                  }}
                />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#3B82F6" 
                  name="学生人数"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 班级学科雷达图 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-6">班级学科能力雷达图</h2>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={[
                {
                  subject: '语文',
                  score: selectedClassData?.scores[0].score || 0,
                },
                {
                  subject: '数学',
                  score: selectedClassData?.scores[1].score || 0,
                },
                {
                  subject: '英语',
                  score: selectedClassData?.scores[2].score || 0,
                },
                {
                  subject: '物理',
                  score: selectedClassData?.scores[3].score || 0,
                },
                {
                  subject: '化学',
                  score: selectedClassData?.scores[4].score || 0,
                },
                {
                  subject: '生物',
                  score: selectedClassData?.scores[5].score || 0,
                },
              ]}
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
              />
              <Radar
                name={selectedClass}
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 