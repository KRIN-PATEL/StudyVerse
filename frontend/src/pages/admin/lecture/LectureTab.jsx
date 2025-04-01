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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2, Trash2, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

const MEDIA_API = "http://localhost:1552/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const params = useParams();
  const { courseId, lectureId } = params;

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message, { style: { color: "green" } });
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed", { style: { color: "red" } });
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
    setShowDeleteDialog(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message, { style: { color: "green" } });
    }
    if (error) {
      toast.error(error.data.message, { style: { color: "red" } });
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message, { style: { color: "green" } });
    }
  }, [removeSuccess]);

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl shadow-xl border rounded-2xl bg-white p-6">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-black-800">
                Edit Lecture
              </CardTitle>
              <CardDescription className="text-gray-600">
                Edit lecture title and video.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div>
                <Label className="text-black-700 text-md font-bold">Title</Label>
                <Input
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                  type="text"
                  placeholder="Enter lecture title..."
                />
              </div>

              
              <div className="mt-4">
                <Label className="text-black-700 text-md font-bold">
                  Upload Video <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={fileChangeHandler}
                  className="w-full"
                />
                {mediaProgress && (
                  <div className="mt-3">
                    <Progress value={uploadProgress} />
                    <p className="text-gray-600 text-sm">{uploadProgress}% uploaded</p>
                  </div>
                )}
              </div>

              
              <div className="flex items-center gap-3 mt-4">
                <Switch checked={isFree} onCheckedChange={setIsFree} />
                <Label className="text-gray-700">Is this video FREE?</Label>
              </div>

              
              <div className="mt-6 flex justify-between">
                <Button
                  disabled={isLoading}
                  onClick={editLectureHandler}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Please wait
                    </>
                  ) : (
                    <>
                      <Pencil size={18} />
                      Update Lecture
                    </>
                  )}
                </Button>

                <Button
                  disabled={removeLoading}
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  {removeLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Please wait
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Remove Lecture
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

     
      {showDeleteDialog && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="p-6">
            <DialogHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                Are you sure you want to delete this lecture?
              </h3>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="border-gray-600 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                onClick={removeLectureHandler}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LectureTab;
