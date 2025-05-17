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

export default function ClassAnalysis() {
  const [selectedClass, setSelectedClass] = useState(classAnalysisData.classAverages[0].className);

  const selectedClassData = classAnalysisData.classAverages.find(
    (c) => c.className === selectedClass
  );

  const selectedClassDistribution = classAnalysisData.classDistributions.find(
    (c) => c.className === selectedClass
  );

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">班级分析</h1>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {classAnalysisData.classAverages.map((c) => (
              <option key={c.className} value={c.className}>
                {c.className}
              </option>
            ))}
          </select>
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
                    fill={`hsl(${index * 120}, 70%, 50%)`}
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