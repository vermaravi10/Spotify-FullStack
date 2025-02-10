import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import {  assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Album = () => {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerContext);

  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`http://localhost:3000/albums/${id}`).then(
        (response) => response.json()
      );
      if (response) {
        setData(response);
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
      <div className="mt-10 flex gap-8 flex-col  md:flex-row  md:items-end">
        <img className="w-48 rounded " src={data?.image} alt="" />
        <div className="flex flex-col">
          <p>PlayList</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{data?.name}</h2>
          <h4>{data?.desc}</h4>
          <p>
            <img
              className="inline-block  w-5 "
              src={assets?.spotify_logo}
              alt=""
            />
            <b>Spotify</b>• 1,323,232 Likes • <b>50 Songs,</b>
            about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets?.clock_icon} alt="" />
      </div>
      <hr />
      {songsData?.map((song, index) => {
        return (
          <div
            onClick={() => {
              playWithId(song?.id);
            }}
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#] hover:bg-[#ffffff2b] cursor-pointer "
          >
            <p className="text-white">
              <b className=" mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5 " src={song?.image} alt="" />
              {song?.name}
            </p>
            <p className="text-[15px]">{data?.name}</p>
            <p className="text-[15px] hidden sm:block">3 Days Ago</p>
            <p className="text-[15px] text-center">{song?.duration}</p>
          </div>
        );
      })}
    </>
  );
};

export default Album;
