import { PreUploadImage } from "types";

export default function(image: string | PreUploadImage): string {
  const content = (image as PreUploadImage).content;
  return content || image as string;
}