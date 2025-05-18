import { useState } from 'react';
import { studentDetailsData } from '@/data/mockData';
import {
  LineChart,
  Line,
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
import { UserIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface Score {
  subject: string;
  score: number;
  trend: string;
}

interface RecentScore {
  examName: string;
  date: string;
  score: number;
}

interface Student {
  id: number;
  name: string;
  class: string;
  scores: Score[];
  recentScores: RecentScore[];
}

export default function StudentDetails() {
  const [selectedStudent, setSelectedStudent] = useState<Student>(studentDetailsData.students[0]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          学生详情
        </h1>
        <div className="mt-4 sm:mt-0">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <select
              value={selectedStudent.id}
              onChange={(e) => {
                const student = studentDetailsData.students.find(
                  (s) => s.id === Number(e.target.value)
                );
                if (student) setSelectedStudent(student);
              }}
              className="block w-full rounded-lg border-gray-300 pl-10 pr-10 py-2.5 text-base font-medium bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 hover:border-gray-400"
            >
              {studentDetailsData.students.map((student: Student) => (
                <option key={student.id} value={student.id} className="py-2">
                  {student.name} - {student.class}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 学生基本信息 */}
      <div className="bg-white shadow rounded-lg p-6">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">姓名</dt>
            <dd className="mt-1 text-sm text-gray-900">{selectedStudent.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">班级</dt>
            <dd className="mt-1 text-sm text-gray-900">{selectedStudent.class}</dd>
          </div>
        </dl>
      </div>

      {/* 成绩概览 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">成绩概览</h2>
        <div className="grid grid-cols-2 gap-6">
          {selectedStudent.scores.map((score: Score) => (
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

      {/* 成绩趋势 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">成绩趋势</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={selectedStudent.recentScores}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="examName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 能力雷达图 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">能力雷达图</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={selectedStudent.scores.map((score: Score) => ({
                subject: score.subject,
                score: score.score,
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name={selectedStudent.name}
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 学习建议 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">学习建议</h2>
        <div className="space-y-6">
          {selectedStudent.scores
            .filter((score: Score) => score.score < 80)
            .map((score: Score) => (
              <div key={score.subject} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                    <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{score.subject}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    建议加强{score.subject}的学习，当前成绩{score.score}分，距离优秀还有提升空间。
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 