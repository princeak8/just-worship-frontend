import type React from "react";
import { Bar, Pie, Cell, PieChart } from 'recharts';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart,
  Legend
} from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, TrendingUp, Gem, Trophy } from "lucide-react";

interface Cards {
  title: string;
  value: string;
  percentage: number;
  trend?: number;
}

const COLORS = ['#a855f7', '#d8b4fe', '#f5f3ff', '#e9d5ff'];

const salesData = [
  { name: 'Jan 1', value: 30, visits: 45 },
  { name: 'Jan 2', value: 45, visits: 62 },
  { name: 'Jan 3', value: 55, visits: 78 },
  { name: 'Jan 4', value: 75, visits: 81 },
  { name: 'Jan 5', value: 65, visits: 69 },
  { name: 'Jan 6', value: 85, visits: 94 },
  { name: 'Jan 7', value: 75, visits: 88 },
];

const socialData = [
  { platform: 'Instagram', users: 4000, fill: '#FFD700' },
  { platform: 'Facebook', users: 3000, fill: '#a855f7' },
  { platform: 'Twitter', users: 2000, fill: '#0A66C2' },
  { platform: 'LinkedIn', users: 1000, fill: '#1DA1F2' },
];

const leaderboard = [
  { name: 'Sarah Johnson', amount: 2450, progress: 90 },
  { name: 'Mike Chen', amount: 1890, progress: 75 },
  { name: 'Emma Wilson', amount: 1560, progress: 62 },
];

const MetricCard: React.FC<Cards> = ({ title, value, percentage, trend }) => (
  <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 backdrop-blur-sm relative overflow-hidden">
    <div className="absolute -right-6 -top-6 bg-purple-100 w-20 h-20 rounded-full" />
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Gem className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-purple-900 font-medium uppercase tracking-wide">{title}</p>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-sm ${trend && trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend && trend > 0 ? <ArrowUp className="w-4 h-4 inline" /> : <ArrowUp className="w-4 h-4 inline rotate-180" />}
              {Math.abs(trend || 0)}%
            </span>
            <span className="text-xs text-gray-500">vs previous month</span>
          </div>
        </div>
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-purple-200 stroke-current"
              strokeWidth="12"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            />
            <circle
              className={`stroke-current ${title === 'Total Revenue' ? 'text-[#E6C200]' : 'text-purple-600'}`}
              strokeWidth="12"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * percentage) / 100}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-sm font-bold text-purple-900">{percentage}%</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Report = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Revenue" value="$24.5K" percentage={78} trend={12} />
        <MetricCard title="Active Users" value="1.2K" percentage={65} trend={-4} />
        <MetricCard title="Conversion Rate" value="3.8%" percentage={82} trend={8} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="md:col-span-2 lg:col-span-3 bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Sales Performance</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#FFD700] rounded-full" />
                  <span>Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-600 rounded-full" />
                  <span>Visits</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    cursor={{ fill: '#f3e8ff' }}
                    contentStyle={{ background: '#fff', border: 'none', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    fill="#FFD700" 
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                  <Bar 
                    dataKey="visits" 
                    fill="#a855f7" 
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Social Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={socialData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="users"
                  >
                    {socialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value) => <span className="text-gray-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Leaderboard</CardTitle>
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((user, index) => (
                  <TableRow key={user.name}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>${user.amount}</TableCell>
                    <TableCell className="text-right">
                      <Progress value={user.progress} className="h-2 bg-purple-100 [&>div]:bg-purple-600" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-2">Avg. Session Duration</div>
                  <div className="text-3xl font-bold">2m 46s</div>
                  <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    12.3%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">Bounce Rate</div>
                  <div className="text-3xl font-bold">34.2%</div>
                  <div className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 rotate-180" />
                    5.1%
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600">86%</div>
                    <div className="text-sm text-gray-500 mt-1">Customer Satisfaction</div>
                  </div>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-purple-600 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset="35.168"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Marketing', 'Sales', 'Support'].map((department) => (
              <div key={department} className="space-y-4">
                <h3 className="font-semibold text-purple-900">{department}</h3>
                {[1, 2].map((item) => (
                  <div key={item} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">New {department.toLowerCase()} task</div>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <div className="text-sm text-gray-600">Completed {Math.floor(Math.random() * 100)}%</div>
                    <Progress 
                      value={Math.floor(Math.random() * 100)} 
                      className="h-2 mt-2 bg-purple-100 [&>div]:bg-purple-600"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;