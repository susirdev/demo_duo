// 模拟数据 - 学科列表
export const subjects = ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理'];

// 模拟数据 - 班级列表
export const classes = ['初一(1)班', '初一(2)班', '初一(3)班', '初二(1)班', '初二(2)班', '初二(3)班'];

// 模拟数据 - 总览页面数据
export const overviewData = {
  // 关键指标
  keyMetrics: {
    averageScore: 78.5,
    passRate: 85.2,
    excellentRate: 35.8,
    totalStudents: 180,
  },
  // 各学科平均分
  subjectAverages: subjects.map(subject => ({
    subject,
    score: Math.floor(Math.random() * 20) + 70, // 70-90之间的随机分数
  })),
  // 最近5次考试趋势
  recentExams: Array.from({ length: 5 }, (_, i) => ({
    examName: `第${i + 1}次月考`,
    date: `2024-${String(i + 1).padStart(2, '0')}-15`,
    averageScore: Math.floor(Math.random() * 15) + 75, // 75-90之间的随机分数
  })),
};

// 模拟数据 - 班级分析数据
export const classAnalysisData = {
  // 班级平均分对比
  classAverages: classes.map(className => ({
    className,
    scores: subjects.map(subject => ({
      subject,
      score: Math.floor(Math.random() * 20) + 70,
    })),
  })),
  // 班级成绩分布
  classDistributions: classes.map(className => ({
    className,
    distribution: [
      { range: '90-100', count: Math.floor(Math.random() * 10) + 5 },
      { range: '80-89', count: Math.floor(Math.random() * 15) + 10 },
      { range: '70-79', count: Math.floor(Math.random() * 15) + 10 },
      { range: '60-69', count: Math.floor(Math.random() * 10) + 5 },
      { range: '0-59', count: Math.floor(Math.random() * 5) + 1 },
    ],
  })),
};

// 模拟数据 - 学生详情数据
export const studentDetailsData = {
  // 学生列表
  students: Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `学生${i + 1}`,
    class: classes[Math.floor(Math.random() * classes.length)],
    scores: subjects.map(subject => ({
      subject,
      score: Math.floor(Math.random() * 40) + 60, // 60-100之间的随机分数
      trend: Math.random() > 0.5 ? 'up' : 'down',
    })),
    // 最近5次考试趋势
    recentScores: Array.from({ length: 5 }, (_, i) => ({
      examName: `第${i + 1}次月考`,
      date: `2024-${String(i + 1).padStart(2, '0')}-15`,
      score: Math.floor(Math.random() * 30) + 70, // 70-100之间的随机分数
    })),
  })),
}; 