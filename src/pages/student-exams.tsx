import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { DocumentTextIcon, ChartBarIcon, PresentationChartLineIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function StudentExams() {
  // 模拟考试详情数据
  const examDetails = [
    {
      examName: '第一次月考',
      date: '2024-01-15',
      totalScore: 85,
      rank: 15,
      classAverage: 78.5,
      subjectScores: [
        { subject: '语文', score: 88, classAverage: 82 },
        { subject: '数学', score: 92, classAverage: 75 },
        { subject: '英语', score: 85, classAverage: 80 },
        { subject: '物理', score: 78, classAverage: 76 },
        { subject: '化学', score: 82, classAverage: 79 },
        { subject: '生物', score: 80, classAverage: 77 },
      ],
    },
    {
      examName: '第二次月考',
      date: '2024-02-15',
      totalScore: 88,
      rank: 12,
      classAverage: 79.2,
      subjectScores: [
        { subject: '语文', score: 90, classAverage: 83 },
        { subject: '数学', score: 95, classAverage: 76 },
        { subject: '英语', score: 87, classAverage: 81 },
        { subject: '物理', score: 82, classAverage: 77 },
        { subject: '化学', score: 85, classAverage: 80 },
        { subject: '生物', score: 83, classAverage: 78 },
      ],
    },
  ];

  const [selectedExam, setSelectedExam] = useState(examDetails[0]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          考试记录
        </h1>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedExam.examName}
            onChange={(e) => {
              const exam = examDetails.find((exam) => exam.examName === e.target.value);
              if (exam) setSelectedExam(exam);
            }}
            className="block w-full rounded-lg border-gray-300 pl-10 pr-10 py-2.5 text-base font-medium bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 hover:border-gray-400 text-gray-900 placeholder-gray-400"
          >
            {examDetails.map((exam) => (
              <option key={exam.examName} value={exam.examName} className="py-2 text-gray-900 font-medium">
                {exam.examName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 考试概览 */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-2 bg-blue-50 rounded-lg">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">总分</h3>
              <p className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">{selectedExam.totalScore}</p>
              <p className="mt-1 text-sm text-gray-500">班级平均：{selectedExam.classAverage}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-2 bg-green-50 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">班级排名</h3>
              <p className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">第 {selectedExam.rank} 名</p>
              <p className="mt-1 text-sm text-gray-500">共 30 名学生</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-2 bg-purple-50 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">考试日期</h3>
              <p className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">{selectedExam.date}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <PresentationChartLineIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">进步情况</h3>
              <p className="mt-1 text-2xl sm:text-3xl font-semibold text-green-600">+3</p>
              <p className="mt-1 text-sm text-gray-500">较上次排名</p>
            </div>
          </div>
        </div>
      </div>

      {/* 各科成绩对比 */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
          <ChartBarIcon className="h-5 w-5 mr-2 text-blue-500" />
          各科成绩对比
        </h2>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={selectedExam.subjectScores}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="subject" 
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
              <Bar 
                dataKey="score" 
                name="个人成绩" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="classAverage" 
                name="班级平均" 
                fill="#9CA3AF" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 成绩趋势 */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
          <PresentationChartLineIcon className="h-5 w-5 mr-2 text-blue-500" />
          成绩趋势
        </h2>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={examDetails}
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
                dataKey="totalScore"
                name="个人总分"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4, fill: '#3B82F6' }}
                activeDot={{ r: 6, fill: '#2563EB' }}
              />
              <Line
                type="monotone"
                dataKey="classAverage"
                name="班级平均"
                stroke="#9CA3AF"
                strokeWidth={2}
                dot={{ r: 4, fill: '#9CA3AF' }}
                activeDot={{ r: 6, fill: '#6B7280' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 考试分析 */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
          <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
          考试分析
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {selectedExam.subjectScores.map((subject) => {
            const difference = subject.score - subject.classAverage;
            const isAboveAverage = difference > 0;
            
            return (
              <div key={subject.subject} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                      isAboveAverage ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-sm font-medium leading-none ${
                        isAboveAverage ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {subject.subject[0]}
                      </span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {subject.subject}分析
                    </h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>
                        得分：{subject.score}分，班级平均：{subject.classAverage}分，
                        {isAboveAverage ? '高于' : '低于'}班级平均{Math.abs(difference)}分。
                        {isAboveAverage 
                          ? '继续保持，可以尝试挑战更高难度的题目。'
                          : '建议加强基础知识的学习，多做练习题。'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 