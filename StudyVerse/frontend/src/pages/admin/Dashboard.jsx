import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="grid gap-6 grid-cols-1 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Dashboard Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No data available at the moment.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
