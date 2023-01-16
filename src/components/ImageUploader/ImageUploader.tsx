import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import { Card, CardContent, Typography, CardActions, Button, Grid, DropZone, Image, ImagePreviews } from "../styledComponents"

interface ImageUrl {
  url: string;
}

interface ImageUploaderProps {
  limit: number;
}

const submitImages = async (images: File[]) => {
  // Validate input
  if (!images || images.length === 0) {
    throw new Error("No images provided");
  }

  // Iterate through images and upload to server
  for (const image of images) {
    // Validate image file
    if (image.type.split("/")[0] !== "image") {
      throw new Error(`Invalid file type for file ${image.name}`);
    }
  
    // Create a form data object to store the image
    const formData = new FormData();
    formData.append("image", image);

    try {
      // Send a post request to the server with the image
      const response = await axios.post("/api/upload", formData);
      console.log(response);
    } catch (err) {
      console.error(`Error uploading image ${image.name}:`, err);
    }
  }
};
export const ImageUploader: React.FC<ImageUploaderProps> = ({ limit }) => {
  const [images, setImages] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImages((prevImages) => {
        const newImages = [...prevImages, ...acceptedFiles];
        if (newImages.length > limit) {
          return newImages.slice(0, limit);
        }
        return newImages;
      });
    },
  });

  return (
    <Card>
      <CardContent>
        <Grid>
          <DropZone {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography>Drop the files here ...</Typography>
            ) : (
              <Typography>
                Drag 'n' drop some files here, or click to select files
              </Typography>
            )}
          </DropZone>
          <ImagePreviews>
            {images.map((image) => (
              <Image
                key={image.name}
                src={URL.createObjectURL(image)}
                alt={image.name}
              />
              ))}
          </ImagePreviews>
        </Grid>
      </CardContent>
      <CardActions>
        <Button v-on:click={submitImages}>Upload</Button>
              </CardActions>
    </Card>
  );
}