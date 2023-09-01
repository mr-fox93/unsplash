import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { UnsplashImage } from "./MainPage";
import ImageListItemBar from "@mui/material/ImageListItemBar";

interface QuiltedPhotoListProps {
  photos: UnsplashImage[];
}

const QuiltedPhotoList: React.FC<QuiltedPhotoListProps> = ({ photos }) => {
  return (
    <ImageList variant="quilted" cols={3} rowHeight={300}>
      {photos.map((photo) => (
        <ImageListItem key={photo.id}>
          <img
            src={photo.urls.regular}
            alt={photo.description}
            loading="lazy"
          />
          <ImageListItemBar title={photo.user?.name || "Unknown Author"} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default QuiltedPhotoList;
