"use client";

import React, { useState } from "react";
import { uploadFile } from "@/helpers/upload-file";

interface IDropFileInputProps extends React.PropsWithChildren {
  id: string;
  name: string;
}

function DropFileInput({ ...rest }: IDropFileInputProps) {
  const [dragging, setDragging] = useState(false);

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files;

    if (file.length > 0) {
      const formData = new FormData();
      formData.append("file", file[0]);

      uploadFile(formData);
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`px-6 py-12 border-dashed border max-w-48 h-72 ${
        dragging
          ? "border-purple-500 bg-purple-400 bg-opacity-20"
          : "border-white bg-transparent"
      }`}
    >
      <label htmlFor={rest.id}></label>
      <input type="file" className="hidden" {...rest} />
    </div>
  );
}

export default DropFileInput;
