import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetDashboardStatsQuery, useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

const Dashboard = () => {
  const { data: statsData, isLoading, isError } = useGetDashboardStatsQuery();
  const { data: purchaseData, isLoading: isPurchaseLoading } = useGetPurchasedCoursesQuery();

  if (isLoading || isPurchaseLoading) {
    return <p className="text-center mt-20 text-xl">Loading Dashboard...</p>;
  }

  if (isError) {
    return <p className="text-center mt-20 text-red-500">Failed to load stats.</p>;
  }

  const {
    courseEnrollmentData,
    revenueData,
    courseCategoryData,
    monthlyActiveUsersData,
  } = statsData;

  const coursePriceData = (purchaseData?.purchasedCourse || []).map((course) => ({
    name: course.courseId?.courseTitle,
    price: course.courseId?.coursePrice,
  }));

  return (
    <div className="grid gap-6 grid-cols-1 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    
      {/* 📌 Dashboard Overview */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full bg-white dark:bg-gray-900">
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
 {/* 💡 Summary Cards: Total Sales & Revenue */}
<Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
  <CardHeader>
    <CardTitle>Total Sales</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold text-blue-600">{purchaseData?.purchasedCourse?.length || 0}</p>
  </CardContent>
</Card>

<Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
  <CardHeader>
    <CardTitle>Total Revenue</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold text-blue-600">
      $
      {purchaseData?.purchasedCourse?.reduce(
        (acc, el) => acc + (el.amount || 0),
        0
      )}
    </p>
  </CardContent>
</Card>

{/* 💵 Course Prices (Purchased Courses) - Full Width */}
<Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full bg-white dark:bg-gray-900">
  <CardHeader>
    <CardTitle className="text-lg font-bold text-black-700 dark:text-gray-300">
      Course Prices (Purchased Courses)
    </CardTitle>
  </CardHeader>
  <CardContent>
  <ResponsiveContainer width="100%" height={300}> {/* Increase height */}
  <LineChart data={coursePriceData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="name"
      angle={-45}
      textAnchor="end"
      interval={0} // Show all labels
      height={80} // Give more space for rotated labels
      stroke="#6b7280"
    />
    <YAxis stroke="#6b7280" />
    <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
    <Line
      type="monotone"
      dataKey="price"
      stroke="#4a90e2"
      strokeWidth={3}
      dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
    />
  </LineChart>
</ResponsiveContainer>

  </CardContent>
</Card>

      {/* 📊 Course Enrollment Statistics */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full lg:col-span-2 bg-white dark:bg-gray-900">
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

      {/* 💰 Revenue Trends */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full lg:col-span-2 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Revenue Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 📚 Course Category Distribution */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full lg:col-span-2 bg-white dark:bg-gray-900">
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
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={90}
              >
                {courseCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {courseCategoryData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-gray-700 dark:text-gray-300">
                  {entry.category}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 👥 Monthly Active Users */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full lg:col-span-2 bg-white dark:bg-gray-900">
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
              <Area
                type="monotone"
                dataKey="users"
                stroke="#00C49F"
                fill="#00C49F"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

     
    </div>
  );
};

export default Dashboard;
