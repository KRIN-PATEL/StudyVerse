import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [coursePublish, setCoursePublish] = useState(false);

  const params = useParams();
  const courseId = params.courseId;
  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });

      setCoursePublish(
        course.courseTitle &&
          course.subTitle &&
          course.description &&
          course.category &&
          course.courseLevel &&
          course.coursePrice &&
<<<<<<< HEAD
          course.lectures.length > 0 
=======
          course.lectures.length > 0
>>>>>>> sprint2/main
      );
    }
  }, [courseByIdData]);

  const deleteCourseHandler = async () => {
    try {
      const response = await deleteCourse(courseId);
      if (response.data) {
<<<<<<< HEAD
        toast.success(response.data.message, {style: {color: "green"}});
        navigate("/admin/course"); 
=======
        toast.success(response.data.message, { style: { color: "green" } });
        navigate("/admin/course");
>>>>>>> sprint2/main
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete course");
    }
<<<<<<< HEAD
    setShowDeleteDialog(false); 
=======
    setShowDeleteDialog(false);
>>>>>>> sprint2/main
  };
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  // const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
    refetch();
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
<<<<<<< HEAD
        toast.success(response.data.message, {style: {color: "green"}});
      }
    } catch (error) {
      toast.error("Failed to publish course", {stylele: {color: "red"}});
=======
        toast.success(response.data.message, { style: { color: "green" } });
      }
    } catch (error) {
      toast.error("Failed to publish course", { stylele: { color: "red" } });
>>>>>>> sprint2/main
    }
  };

  useEffect(() => {
    if (isSuccess) {
<<<<<<< HEAD
      toast.success(data.message || "Course updated successfully.", {style: {color: "green"}});
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course", {style: {color: "red"}});
=======
      toast.success(data.message || "Course updated successfully.", {
        style: { color: "green" },
      });
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course", {
        style: { color: "red" },
      });
>>>>>>> sprint2/main
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
<<<<<<< HEAD
    <Card>
=======
    <Card className="">
>>>>>>> sprint2/main
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when youre done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
<<<<<<< HEAD
          className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
=======
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
>>>>>>> sprint2/main
            disabled={!coursePublish}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button
            onClick={() => setShowDeleteDialog(true)}
            variant="destructive"
          >
            Remove Course
          </Button>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="p-6">
              <DialogHeader>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Are you sure you want to delete this course?
                </h3>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  className="text-gray-800 border-gray-800 dark:text-white dark:border-white hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={deleteCourseHandler}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
<<<<<<< HEAD
            <Label className="font-bold">Title</Label>
=======
            <Label>Title</Label>
>>>>>>> sprint2/main
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
<<<<<<< HEAD
            <Label className="font-bold">Subtitle</Label>
=======
            <Label>Subtitle</Label>
>>>>>>> sprint2/main
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
<<<<<<< HEAD
            <Label className="font-bold">Description</Label>
=======
            <Label>Description</Label>
>>>>>>> sprint2/main
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
<<<<<<< HEAD
              <Label className="font-bold">Category</Label>
=======
              <Label>Category</Label>
>>>>>>> sprint2/main
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
<<<<<<< HEAD
                    <SelectLabel className="font-bold">Category</SelectLabel>
=======
                    <SelectLabel>Category</SelectLabel>
>>>>>>> sprint2/main
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
<<<<<<< HEAD
              <Label className="font-bold">Course Level</Label>
=======
              <Label>Course Level</Label>
>>>>>>> sprint2/main
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
<<<<<<< HEAD
                    <SelectLabel className="font-bold">Course Level</SelectLabel>
=======
                    <SelectLabel>Course Level</SelectLabel>
>>>>>>> sprint2/main
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
<<<<<<< HEAD
              <Label className="font-bold">Price in (CAD)</Label>
=======
              <Label>Price in (CAD)</Label>
>>>>>>> sprint2/main
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
<<<<<<< HEAD
            <Label className="font-bold">Course Thumbnail</Label>
=======
            <Label>Course Thumbnail</Label>
>>>>>>> sprint2/main
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="e-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div>
<<<<<<< HEAD
            <Button onClick={() => navigate("/admin/course")} variant="outline"
              className="border-black"
              >
              Cancel
            </Button>{" "}
            &nbsp;
            <Button disabled={isLoading} onClick={updateCourseHandler}
            className="bg-blue-600 hover:bg-blue-700"
            >
=======
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>{" "}
            &nbsp;
            <Button disabled={isLoading} onClick={updateCourseHandler}>
>>>>>>> sprint2/main
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
