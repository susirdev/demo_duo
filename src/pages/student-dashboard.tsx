import { useState } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';

export default function StudentDashboard() {
  const { userType } = useAuth();
  // 模拟当前登录的学生数据
  const currentStudent = studentDetailsData.students[0];

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">个人成绩分析</h1>
      </div>

      {/* 学生基本信息 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">基本信息</h2>
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">姓名</dt>
                <dd className="mt-1 text-sm text-gray-900">{currentStudent.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">班级</dt>
                <dd className="mt-1 text-sm text-gray-900">{currentStudent.class}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">成绩概览</h2>
            <div className="grid grid-cols-2 gap-6">
              {currentStudent.scores.map((score) => (
                <div key={score.subject} className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{score.subject}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{score.score}</span>
                    {score.trend === 'up' ? (
                      <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="ml-1 h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 成绩趋势图 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 历史成绩趋势 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-6">历史成绩趋势</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={currentStudent.recentScores}
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
                    value: '分数', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: 12 }
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="总分"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 学科能力雷达图 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-6">学科能力分析</h2>
          <div className="h-[400px]">
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
                  tick={{ fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12 }}
                />
                <Radar
                  name={currentStudent.name}
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

      {/* 学习建议 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-6">学习建议</h2>
        <div className="space-y-6">
          {currentStudent.scores
            .filter((score) => score.score < 80)
            .map((score) => (
              <div key={score.subject} className="flex items-start">
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
            ))}
        </div>
      </div>
    </div>
  );
} 