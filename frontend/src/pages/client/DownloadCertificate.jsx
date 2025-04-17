import React from "react";
import { Button } from "@/components/ui/button";
import { useLazyGenerateCertificateQuery } from "@/features/api/certificateApi";
import { toast } from "sonner";

const DownloadCertificate = ({ name, courseName }) => {
  const [triggerCertificate] = useLazyGenerateCertificateQuery();

  const downloadCertificate = async () => {
    try {
      const url = `/api/certificate/generate?name=${encodeURIComponent(
        name
      )}&courseName=${encodeURIComponent(courseName)}`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to download certificate");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `certificate-${courseName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error("Error downloading certificate");
    }
  };
  // generate certificate button
  return (
    <Button
      onClick={downloadCertificate}
      className="bg-green-600 hover:bg-green-700 text-white mt-4"
    >
      🎓 Generate Certificate
    </Button>
  );
};

export default DownloadCertificate;
