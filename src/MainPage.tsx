import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import QuiltedPhotoList from "./QuiltedPhotoList";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

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

  const { data, isLoading, isError, error } = useQuery<UnsplashResponse>(
    ["photos", searchTerm],
    () => fetchUnsplash(searchTerm),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    }
    //{ enabled: !!searchTerm }
  );

  return (
    <div>
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

      {isLoading && <p>Ładowanie...</p>}
      {isError && <p>Wystąpił błąd: {(error as Error).message}</p>}

      {data && <QuiltedPhotoList photos={data.results} />}
    </div>
  );
};

export default MainPage;
