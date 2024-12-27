"use server";

import { InvalidFileExtensionError } from "@/errors/file-errors";
import { revalidatePath } from "next/cache";
import fs from "node:fs";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const extension = file.name.split(".").pop();

  if (extension === undefined || extension !== "pdf") {
    throw new InvalidFileExtensionError();
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  fs.writeFile(`./public/uploads/${+new Date()}.${extension}`, buffer, () =>
    console.log("File uploaded")
  );

  revalidatePath("/");
}
