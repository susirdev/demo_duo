import { useState } from 'react';
import { useRouter } from 'next/router';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 简单的登录验证
    if (username === 'teacher' && password === 'teacher') {
      // 存储用户类型和登录状态
      localStorage.setItem('userType', 'teacher');
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else if (username === 'student' && password === 'student') {
      localStorage.setItem('userType', 'student');
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/student-dashboard');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <AcademicCapIcon className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          学科成绩分析系统
        </h2>
        <p className="mt-3 text-center text-base text-gray-600">
          请登录以访问系统
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-12">
          <form className="space-y-8" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                用户名
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="请输入用户名"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                密码
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
              >
                登录
              </button>
            </div>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">测试账号</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">教师账号</h3>
                <p className="text-sm text-gray-600">用户名：teacher</p>
                <p className="text-sm text-gray-600">密码：teacher</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">学生账号</h3>
                <p className="text-sm text-gray-600">用户名：student</p>
                <p className="text-sm text-gray-600">密码：student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 