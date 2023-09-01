import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import QuiltedPhotoList from "./QuiltedPhotoList";
import TextField from "@mui/material/TextField";

export interface UnsplashImage {
  id: string;
  error: string;

  urls: {
    regular: string;
  };
  user: {
    name: string;
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
    () => fetchUnsplash(searchTerm)
    // { enabled: !!searchTerm }
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
      />
      {isLoading && <p>Ładowanie...</p>}
      {isError && <p>Wystąpił błąd: {(error as Error).message}</p>}

      {data && <QuiltedPhotoList photos={data.results} />}
    </div>
  );
};

export default MainPage;
