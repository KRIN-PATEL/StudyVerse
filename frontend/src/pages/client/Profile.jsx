import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter,DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";


const Profile = () => {
    // false 
    // const isLoading=true;
    const {data, isLoading} = useLoadUserQuery();
    console.log(data);
    const enrolledCourses = [1,2];

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5 ">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 w-32 mb-4">
            <AvatarImage src="https://imgs.search.brave.com/ULdUqCYl85mL4y5vUutulLJAS7dxYXur9W2TvaKEDLI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hdmF0/YXIuaXJhbi5saWFy/YS5ydW4vcHVibGlj/LzE0.jpeg" />
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Krin Patel
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Krin@gmail.com
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Student
              </span>
            </h1>
          </div>
          <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="mt-2">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Edit your profile here</DialogDescription>
            </DialogHeader>
<div className="grid gap-4 py-4">
<div className="grid grid-cols-4 items-center gap-4" >
    <Label>Name</Label>
    <Input type="text" placeholder="Name"  className="col-sapn-3"/>
</div>
<div className="grid grid-cols-4 items-center gap-4" >
    <Label>Photo</Label>
    <Input type="file" accept="image/*"className="col-sapn-3"/>
</div>

</div>
<DialogFooter>
   <Button disabled={isLoading}>
    {
        isLoading ? (
            <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
            </>
        ) : "Save Changes"
    }
   </Button>
</DialogFooter>
          </DialogContent>
          </Dialog>
        </div>
        <div>
            <h1 className="font-medium text-lg">enrolled Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
{
    enrolledCourses.length===0 ? <h1> you havent enroll yet</h1>:(
        enrolledCourses.map((course, index) => <Course key={index} /> )
    )
}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
