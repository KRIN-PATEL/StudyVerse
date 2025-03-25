import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

// Static Data for Charts
const courseEnrollmentData = [
  { month: "Jan", enrollments: 30 },
  { month: "Feb", enrollments: 50 },
  { month: "Mar", enrollments: 35 },
  { month: "Apr", enrollments: 50 },
  { month: "May", enrollments: 70 },
];

const revenueData = [
  { month: "Jan", revenue: 200 },
  { month: "Feb", revenue: 300 },
  { month: "Mar", revenue: 250 },
  { month: "Apr", revenue: 200 },
  { month: "May", revenue: 300 },
];

const courseCategoryData = [
  { category: "Full Stack Development", value: 10 },
  { category: "Mern Stack Development", value: 10 },
  { category: "Frontend Development", value: 18 },
  { category: "Data Science", value: 10 },
  { category: "Python", value: 10 },
  { category: "Docker", value: 15 },
];

const monthlyActiveUsersData = [
  { month: "Jan", users: 50 },
  { month: "Feb", users: 70 },
  { month: "Mar", users: 50 },
  { month: "Apr", users: 70 },
  { month: "May", users: 90 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

const Dashboard = () => {
  return (
    <div className="grid gap-6 grid-cols-1 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      
      {/* Dashboard Overview */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black-700 dark:text-gray-300">
            Dashboard Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-black-600 dark:text-gray-400 font-bold">
            Overview of Study Verse statistics including enrollments, revenue, and user activity.
          </p>
        </CardContent>
      </Card>

      {/* Course Enrollment Statistics */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-black-700 dark:text-gray-300">
            Total Students Enrolled
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseEnrollmentData}>
              <XAxis dataKey="month" stroke="#000000" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="enrollments" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trends */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Revenue Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Course Category Distribution */}
      {/* <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Course Category Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={courseCategoryData} 
                dataKey="value" 
                cx="50%" cy="50%" 
                outerRadius={90} 
              >
                {courseCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
           */}
          {/* Legend Displayed Below */}
          {/* <div className="flex flex-wrap justify-center gap-3 mt-4">
            {courseCategoryData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-gray-700 dark:text-gray-300">{entry.category}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Monthly Active Users */}
      {/* <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-black-700 dark:text-gray-300">
            Total Active Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyActiveUsersData}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#00C49F" fill="#00C49F" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Dashboard;
