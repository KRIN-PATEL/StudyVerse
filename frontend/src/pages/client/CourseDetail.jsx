import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/ui/BuyCourseButton";
import { CardDescription, CardHeader, Card, CardTitle, CardContent, CardFooter} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { BadgeInfo, PlayCircle, Lock} from "lucide-react";

import React from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId= params.courseId;
  const purchasedCourse = false;
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Created By {""}{" "}
            <span className="text-[#C0C4FC] underline italic">Krin Patel</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 3-13-2025</p>
          </div>
          <p>Student Enrolled : 15</p>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-1/2 space-y-5">
            <h1 className="font-bold text-xl md:text-2xl">Description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fuga
              facilis quam ab? Porro est atque velit assumenda incidunt cum eos at
              nam quos nobis magnam rerum laudantium, id quis!
            </p>
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>4 lectures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {
                  [1, 2, 3].map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <span>
                        {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                      </span>
                      <p>Lecture Title</p>
                    </div>
                  ))
                }
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-1/3">
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="w-full aspect-video mb-4">
                  React Player Video
                </div>
                <h1>Lecture Title</h1>
           
                <Separator className="my-4 w-full h-px bg-gray-400" />
                <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
              </CardContent>
              <CardFooter>
                {
                  purchasedCourse ? (
                    <Button className="w-full">Purchase Course</Button>
                  ) :
                  (
                    <BuyCourseButton courseId={courseId}/>
                  )
                }
               
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
