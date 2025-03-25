import { Select, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, Separator } from "@radix-ui/react-select";
import React from "react";

const Filter = () => {
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>SORT BY PRICE</SelectLabel>
                <SelectItem value="low">Low to High</SelectItem>
                <SelectItem value="high">High to Low</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold mb-2">CATEGORY</h1>
      </div>
    </div>
  );
};

export default Filter;
