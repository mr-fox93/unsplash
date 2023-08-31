import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetchUnsplash = async (searchTerm: string) => {
  const apiKey = process.env.REACT_APP_MY_API_KEY;
  const res = await axios.get(
    `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${apiKey}`
  );
  console.log(res.data.results);
};

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery(
    ["photos", searchTerm],
    () => fetchUnsplash(searchTerm)
  );

  return (
    <div>
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};

export default MainPage;
