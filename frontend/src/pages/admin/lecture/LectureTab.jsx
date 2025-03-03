import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const LectureTab = () => {
  return (
    <Card>
      <CardHeader ClassName="flex justify-between">
        <div>
          <CardTitle> Edit Lecture</CardTitle>
          <CardDescription> Make Changes and click save!!</CardDescription>
        </div>
        <div>
          <Button></Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LectureTab;
