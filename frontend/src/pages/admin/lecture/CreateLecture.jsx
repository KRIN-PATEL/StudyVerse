
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      toast.error("Lecture title cannot be empty!", { style: { color: "red" } });
      return;
    }
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message, { style: { color: "green" } });
      setLectureTitle(""); 
    }
    if (error) {
      toast.error(error.data.message, { style: { color: "red" } });
    }
  }, [isSuccess, error]);

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-2xl p-6 shadow-lg border rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Lecture</CardTitle>
          <CardDescription className="text-center">
            Provide a title for your lecture and start creating content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div>
              <Label className="text-md font-bold">Lecture Title</Label>
              <Input
                type="text"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                placeholder="Enter Lecture Title"
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
              className="border-black"
                variant="outline"
                onClick={() => navigate(`/admin/course/${courseId}`)}
              >
                Back to Course
              </Button>
              <Button disabled={isLoading} onClick={createLectureHandler}
              className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Create Lecture"
                )}
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Lecture List</h2>
            <div className="border rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-gray-800">
              {lectureLoading ? (
                <p className="text-center">Loading lectures...</p>
              ) : lectureError ? (
                <p className="text-red-500 text-center">Failed to load lectures.</p>
              ) : lectureData.lectures.length === 0 ? (
                <p className="text-center font-bold text-black-500">No lectures available.</p>
              ) : (
                <ul className="space-y-2">
                  {lectureData.lectures.map((lecture, index) => (
                    <Lecture
                      key={lecture._id}
                      lecture={lecture}
                      courseId={courseId}
                      index={index}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateLecture;
