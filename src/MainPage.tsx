import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface UnsplashImage {
  id: string;
  error: string;

  urls: {
    small: string;
  };
  description: string;
}

interface UnsplashResponse {
  results: UnsplashImage[];
}

const fetchUnsplash = async (searchTerm: string): Promise<UnsplashResponse> => {
  const apiKey = process.env.REACT_APP_MY_API_KEY;
  let res;

  if (searchTerm === "") {
    res = await axios.get<UnsplashImage[]>(
      `https://api.unsplash.com/photos/random?count=10&client_id=${apiKey}`
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
      <input
        value={searchTerm}
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <p>Ładowanie...</p>}
      {isError && <p>Wystąpił błąd: {(error as Error).message}</p>}

      {data?.results.map((photo) => (
        <img key={photo.id} src={photo.urls.small} alt={photo.description} />
      ))}
    </div>
  );
};

export default MainPage;
