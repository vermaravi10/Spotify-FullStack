import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItems from "./SongItems";

const DisplayHome = () => {
  const [albumsData, setAlbumsData] = useState([]);


  const fetchAlbums = async () => {
    try {
      const response = await fetch("http://localhost:3000/albums").then(
        (response) => response.json()
      );
      if (response) {
        setAlbumsData(response);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold  text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData?.map((album, index) => {
            return (
              <AlbumItem
                key={index}
                name={album?.name}
                desc={album?.desc}
                id={album?._id}
                image={album?.image}
              />
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold  text-2xl">Today's Biggest Hits</h1>
        <div className="flex overflow-auto">
          {songsData?.map((songs, index) => {
            return (
              <SongItems
                key={index}
                name={songs?.name}
                desc={songs?.desc}
                id={songs?.id}
                image={songs?.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
