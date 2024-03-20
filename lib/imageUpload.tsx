import Image from "next/image";
import React, { useState } from "react";

const ImageUpload = ({ setImageUrlCallback }: any) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sgsi7dbd"); // Add your upload preset here
    formData.append("public_id", crypto.randomUUID());

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxavl3woe/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data?.secure_url); // Get the secure_url
      setImageUrlCallback(data?.secure_url);
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="max-w-[300px] w-full my-2">
      <input
        type="file"
        accept="image/*"
        className="my-2 max-w-[300px]"
        onChange={handleUpload}
      />
      {imageUrl && (
        <div>
          <Image
            src={imageUrl}
            className="my-2 mx-auto"
            alt="Uploaded to Cloudinary"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
