import { apiSlice } from "./apiSlice";

export const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    downloadCertificate: builder.mutation({
      query: ({ name, courseName }) => ({
        url: `/certificate/generate?name=${encodeURIComponent(
          name
        )}&courseName=${encodeURIComponent(courseName)}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useDownloadCertificateMutation } = certificateApi;
