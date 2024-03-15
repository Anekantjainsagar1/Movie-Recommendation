"use client";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BASE_URL } from "../Utils";
import Context from "../Context/Context";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { searchResults, setSearchResults, get_prediction, setData } =
    useContext(Context);

  const submit = () => {
    axios
      .get(`${BASE_URL}/movies?movie=${search}`)
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get_details = (e) => {
    axios
      .get(`${BASE_URL}/get-details?id=${e?.movie_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="px-4 flex items-center justify-between py-3 border-b border-b-gray-500 w-full fixed left-0 top-0 backdrop-blur-sm">
        <h1 className="cursor-pointer text-xl md:text-2xl font-bold">
          Movie Recommendation
        </h1>
        <div className="flex items-center relative">
          <input
            type="search"
            placeholder="Search Here.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchResults([]);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                submit();
              }
            }}
            autoFocus={true}
            className="bg-transparent outline-none border-b border-b-400 px-2 py-0.5 w-[25vw] md:w-[18vw]"
          />
          <AiOutlineSearch
            className="text-[26px] font-bold cursor-pointer ml-1 md:ml-2"
            onClick={submit}
          />
        </div>
        {searchResults?.length > 0 && (
          <div className="border max-h-[40vh] md:max-h-[20vh] bg-black overflow-y-auto absolute border-gray-400 px-0.5 top-[6.5vh] md:top-[8.5vh] w-[70vw] md:w-[20vw] rounded-md right-3 md:right-4">
            {searchResults.map((e, i) => {
              return (
                <p
                  key={i}
                  onClick={() => {
                    get_prediction(e?.movie_id);
                    get_details(e);
                  }}
                  className="cursor-pointer py-0.5 hover:bg-gray-700 px-3 rounded-md transition-all my-0.5"
                >
                  {e?.movie}
                </p>
              );
            })}
          </div>
        )}
      </div>
      <div className="my-16"></div>
    </>
  );
};

export default Navbar;
