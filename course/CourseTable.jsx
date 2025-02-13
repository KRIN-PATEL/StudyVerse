import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";


const courses = [
  { _id: "1", courseTitle: "React Basics", coursePrice: "$99", isPublished: true },
  { _id: "2", courseTitle: "Node.js Advanced", coursePrice: "$149", isPublished: false },
  { _id: "3", courseTitle: "Full-Stack Development", coursePrice: "$199", isPublished: true },
];

const CourseTable = () => {
 

  return (
    <div className="mt-20">
      <Button>Create a new course</Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course.coursePrice || "NA"}</TableCell>
              <TableCell> <Badge>{course.isPublished ? "Published" : "Draft"}</Badge> </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                 <Button size='sm' variant='ghost'><Edit/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;