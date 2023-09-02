import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { UnsplashImage } from "./MainPage";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useMediaQuery } from "@mui/material";
import { GlobalContext } from "./global";
import { useContext } from "react";

interface QuiltedPhotoListProps {
  photos: UnsplashImage[];
}

const QuiltedPhotoList: React.FC<QuiltedPhotoListProps> = ({ photos }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("MainPage must be wrapped with GlobalProvider");
  }
  const { lightDarkMode } = context;

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleImageClick = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <ImageList
      variant="quilted"
      cols={isSmallScreen ? 1 : 3}
      rowHeight={300}
      style={{
        margin: 0,
        padding: 0,
        border: "none",

        backgroundColor: lightDarkMode ? "#fff" : "rgba(0, 0, 0, 0.6)",
      }}
    >
      {photos.map((photo) => (
        <ImageListItem key={photo.id} style={{ cursor: "pointer" }}>
          <img
            src={photo.urls.regular}
            alt={photo.description}
            loading="lazy"
            onClick={() => handleImageClick(photo.urls.raw)}
          />
          <ImageListItemBar
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={photo.user?.profile_image.large}
                  alt={photo.user?.name || "Unknown Author"}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                />
                {photo.user?.name || "Unknown Author"}
              </div>
            }
            actionIcon={
              <IconButton
                sx={{
                  color: "rgba(255, 255, 255, 0.54)",
                  "& svg": {
                    color: "rgba(255, 255, 255, 0.54)",
                  },
                }}
              >
                <a
                  href={photo.user.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <InfoIcon />
                </a>
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default QuiltedPhotoList;
