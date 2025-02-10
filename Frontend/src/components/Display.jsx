import React, { useEffect, useRef, useState } from "react";
import DisplayHome from "./DisplayHome";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Album from "./Album";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();

  const [isAlbum, setIsAlbum] = useState(false);
  const [bgColor, setBgColor] = useState();
  const [albumsData, setAlbumsData] = useState([]);

  const albumId = isAlbum ? location?.pathname?.slice(-24).toString() : "";

  useEffect(() => {
    if (!location?.pathname?.includes("album")) {
      setIsAlbum(false);
    } else {
      setIsAlbum(true);
    }
  }, [location]);

  useEffect(() => {
    if (!albumsData) return;
    else {
      const color = albumsData?.filter((item) => item?._id == albumId)[0]?.bgColor;
      console.log("🚀 ~ color ~ color:", color);

      setBgColor(color);
    }
  }, [albumId]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`http://localhost:3000/albums`).then(
        (response) => response.json()
      );
      if (response) {
        setAlbumsData(response);
      }
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else displayRef.current.style.background = `#121212`;
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<Album />} />
      </Routes>
    </div>
  );
};

export default Display;
