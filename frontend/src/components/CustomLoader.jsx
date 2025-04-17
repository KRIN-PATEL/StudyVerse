import React from "react";
import { useLoadUserQuery } from "@/features/api/authApi";
import LoadingSpinner from "./LoadingSpinner";

const CustomLoader = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner /> : children}</>;
};

export default CustomLoader;
