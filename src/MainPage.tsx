import React, { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import QuiltedPhotoList from "./QuiltedPhotoList";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import { GlobalContext } from "./global";

export interface UnsplashImage {
  id: string;
  error: string;

  urls: {
    regular: string;
    raw: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
    profile_image: {
      large: string;
    };
  };
  description: string;
}

export interface UnsplashResponse {
  results: UnsplashImage[];
}

const fetchUnsplash = async (searchTerm: string): Promise<UnsplashResponse> => {
  const apiKey = process.env.REACT_APP_MY_API_KEY;
  let res;

  if (searchTerm === "") {
    res = await axios.get<UnsplashImage[]>(
      `https://api.unsplash.com/photos/random?count=12&client_id=${apiKey}`
    );
    return {
      results: res.data,
    };
  } else {
    res = await axios.get<UnsplashResponse>(
      `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${apiKey}`
    );
    console.log(res.data.results);
    return res.data;
  }
};

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("MainPage must be wrapped with GlobalProvider");
  }
  const { lightDarkMode, setLightDarkMode } = context;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, isError, error } = useQuery<UnsplashResponse>(
    ["photos", searchTerm],
    () => fetchUnsplash(searchTerm),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          gap: isMobile ? "10px" : "0",
          padding: ".5rem",
          backgroundColor: lightDarkMode ? "#fff" : "rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          style={{
            left: isMobile ? "0" : "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <GitHubIcon
            fontSize="large"
            style={{ color: "rgba(0, 0, 0, 0.6)" }}
          />
          <p style={{ marginLeft: "10px", color: "rgba(0, 0, 0, 0.6)" }}>
            <a
              style={{
                textDecoration: "none",
                color: "rgba(0, 0, 0, 0.6)",
              }}
              href="https://github.com/mr-fox93"
              target="_blank"
              rel="noreferrer"
            >
              mr-fox93
            </a>
          </p>
        </div>
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Find what you like..."
          variant="outlined"
          value={searchTerm}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            {lightDarkMode ? (
              <LightModeIcon style={{ color: "rgba(0, 0, 0, 0.6)" }} />
            ) : (
              <NightsStayIcon style={{ color: "rgba(0, 0, 0, 0.6)" }} />
            )}
          </div>
          <Switch
            onChange={() => setLightDarkMode(!lightDarkMode)}
            defaultChecked={false}
            color="default"
          />
        </div>
      </div>

      {isLoading && (
        <Stack
          sx={{
            color: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
          spacing={6}
          direction="row"
        >
          <CircularProgress color="inherit" />
        </Stack>
      )}
      {isError && <p>Wystąpił błąd: {(error as Error).message}</p>}

      {data && <QuiltedPhotoList photos={data.results} />}
    </>
  );
};

export default MainPage;
