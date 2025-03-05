// import { AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
// import { Avatar } from "@radix-ui/react-avatar";
// import { Badge } from "@/components/ui/badge";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ">
      <div className="relative">
        <img
          src="https://w0.peakpx.com/wallpaper/1019/788/HD-wallpaper-javascript-glitter-logo-programming-language-grid-metal-background-javascript-creative-programming-language-signs-javascript-logo-thumbnail.jpg"
          className=" w-full h-36 object-cover rounded-top-lg"
          alt="Course Image"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:undeline font-bold text-lg truncate">
          Js Course{" "}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <Avatar className="h-12 w-12">
              <AvatarImage src="https://imgs.search.brave.com/ULdUqCYl85mL4y5vUutulLJAS7dxYXur9W2TvaKEDLI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hdmF0/YXIuaXJhbi5saWFy/YS5ydW4vcHVibGlj/LzE0.jpeg" />
            </Avatar> */}
            <h1 className="font-medium text-sm"></h1>
          </div>
          {/* <Badge
            className={"bg-blue-600 text-white px-2 py-1 text-xs rounded-full"}
          >
            Advance
          </Badge> */}
        </div>
        <div className="text-lg font-bold">
          <span>200$</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
