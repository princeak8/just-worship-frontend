import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { ArrowUp, Gem } from "lucide-react";

interface Cards {
title: string;
value: string;
percentage: number;
trend?: number;
}

const salesData = [
  { name: 'Jan 1', value: 30 },
  { name: 'Jan 2', value: 45 },
  { name: 'Jan 3', value: 55 },
  { name: 'Jan 4', value: 75 },
  { name: 'Jan 5', value: 65 },
  { name: 'Jan 6', value: 85 },
  { name: 'Jan 7', value: 75 },
];

const MetricCard: React.FC<Cards> = ({ title, value, percentage, trend }) => (
  <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 backdrop-blur-sm relative overflow-hidden w-full">
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
              className="text-purple-600 stroke-current"
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

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricCard title="VIEWS" value="500" percentage={78} />
        <MetricCard title="ORDERS" value="3200" percentage={45} />
        <MetricCard title="SALES" value="2800" percentage={72} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#FFD700" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Tithers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-200 rounded-full" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">User {item}</div>
                    <div className="text-sm text-gray-500">${(Math.random() * 1000).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top 3 tithers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Tither 1</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="h-2 bg-purple-200 [&>div]:bg-purple-600" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Tither 2</span>
                  <span>86%</span>
                </div>
                <Progress value={86} className="h-2 bg-purple-200 [&>div]:bg-purple-500" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Tither 3</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2 bg-purple-200 [&>div]:bg-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
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
                    className="text-purple-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-2xl font-bold">75%</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between w-full">
                <div>
                  <div className="text-sm text-gray-500">Target</div>
                  <div className="font-bold">$999</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Sales</div>
                  <div className="font-bold">$750</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;