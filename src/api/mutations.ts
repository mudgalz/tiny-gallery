import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useApiMutations() {
  const downloadImageMutation = useMutation({
    mutationFn: async ({
      url,
      filename,
    }: {
      url: string;
      filename: string;
    }) => {
      const response = await axios.get(url, {
        responseType: "blob",
      });
      return { blob: response.data, filename };
    },
    onSuccess: ({ blob, filename }) => {
      const blobUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      console.log("Image Downloaded!");
    },
    onError: (error) => {
      console.error("Failed to download image", error);
    },
  });
  return { downloadImageMutation };
}
