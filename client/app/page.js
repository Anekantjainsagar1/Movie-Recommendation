"use client";
import React, { useContext, useEffect, useState } from "react";
import Context from "./Context/Context";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { Oval } from "react-loader-spinner";

const App = () => {
  const { data, recommendationsData, reviews, loading } = useContext(Context);
  const [showMore, setShowMore] = useState(false);
  const [showReview, setShowReview] = useState(false);

  return data ? (
    <div className="px-5 md:px-7">
      <div className="flex items-start md:items-center justify-between">
        <h1 className="text-2xl w-9/12 pr-2 font-semibold">
          {data?.about?.movie}
        </h1>
        <div className="md:text-lg w-3/12 text-end">
          {data?.rating && data?.rating + "/10"}
          <span className="text-sm ml-2 text-gray-300">
            {data?.rating_people && "(" + data?.rating_people + " Reviews)"}
          </span>
        </div>
      </div>
      <div className="px-1 md:px-3 md:flex-row flex-col pt-3 flex items-start">
        <img
          alt={data?.about?.movie}
          src={data?.poster}
          width={1000}
          height={1000}
          className="w-full md:rounded-none rounded-md md:w-[35vw] object-cover object-center"
        />
        <div className="md:pl-5 md:mt-0 mt-3 pl-1 pr-1 md:w-[65vw]">
          {data?.description && <p className="text-lg">{data?.description}</p>}
          {data?.director && (
            <p className="mt-1">
              <span className="text-gray-300">Director:- </span>
              {data?.director}
            </p>
          )}
          {data?.final_writers?.length > 0 && (
            <p className="mt-1">
              <span className="text-gray-300">Writers:- </span>
              {data?.final_writers?.map((e, i, list) => {
                return (
                  <span key={i}>
                    {e}
                    {i != list.length - 1 && ","}{" "}
                  </span>
                );
              })}
            </p>
          )}
          {data?.final_stars && (
            <p className="mt-1">
              <span className="text-gray-300">Stars:- </span>
              {data?.final_stars?.map((e, i, list) => {
                return (
                  <span key={i}>
                    {e}
                    {i != list.length - 1 && ","}{" "}
                  </span>
                );
              })}
            </p>
          )}
          {data?.big_awards && (
            <p className="mt-1">
              <span className="text-gray-300">Awards:- </span>
              {data?.big_awards}
            </p>
          )}
          {data?.music_data?.length > 1 && (
            <p className="mt-1">
              <span className="text-gray-300">SoundTracks:- </span>
              <div className="ml-1 md:ml-3">
                <p className="font-bold">{data?.music_data[0]}</p>
                {data?.music_data?.slice(1)?.map((e, i, list) => {
                  return (
                    <li key={i} className="font-normal ml-1">
                      {e}
                    </li>
                  );
                })}
              </div>
            </p>
          )}
          {data?.title_data && (
            <div className="flex items-center mt-2">
              {data?.title_data?.map((e, i) => {
                return (
                  <p
                    key={i}
                    className="border px-5 mr-2 rounded-full hover:text-gray-300 transition-all border-gray-500 py-0.5 cursor-pointer"
                  >
                    {e}
                  </p>
                );
              })}
            </div>
          )}
          <div className="mt-4">
            <h1 className="text-lg font-semibold">Top Casts</h1>
            <div className="md:block hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 pt-3 px-1 md:px-5">
                {data?.actors_data
                  ?.slice(0, showMore ? data.actors_data.length : 9)
                  .map((e, i) => {
                    return <Actor e={e} key={i} />;
                  })}
              </div>
              {data?.actors_data?.length > 9 && !showMore && (
                <button
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                  className="mt-3 ml-5 flex items-center text-lg text-gray-300"
                >
                  Show More <AiOutlineDown className="ml-3" />
                </button>
              )}
            </div>
            <div className="md:hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 pt-3 px-1 md:px-5">
                {data?.actors_data
                  ?.slice(0, showMore ? data.actors_data.length : 5)
                  .map((e, i) => {
                    return <Actor e={e} key={i} />;
                  })}
              </div>
              {data?.actors_data?.length > 5 && !showMore && (
                <button
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                  className="mt-3 flex items-center text-lg text-gray-300"
                >
                  Show More <AiOutlineDown className="ml-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:px-5 px-2 mt-8 md:mt-4">
        <h1 className="text-2xl md:text-xl md:font-normal font-bold flex items-center">
          More Like This <AiOutlineRight className="ml-3" />
        </h1>
        {recommendationsData?.length > 0 ? (
          <div className="grid md:grid-cols-5 md:gap-y-0 gap-y-4 px-2 mt-3 mb-8 gap-x-4">
            {recommendationsData?.map((e, i) => {
              return <Block data={e} key={i} />;
            })}
          </div>
        ) : (
          <div className="flex items-center py-10 justify-center">
            <Oval
              visible={true}
              height="40"
              width="40"
              color="#fff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
      <div className="md:px-5 px-2 mt-8 md:mt-4">
        <h1 className="text-2xl md:text-xl md:font-normal font-bold flex items-center">
          Reviews <AiOutlineRight className="ml-3" />
        </h1>
        {reviews?.review ? (
          <>
            <div className="grid md:grid-cols-2 md:gap-y-4 gap-y-4 px-2 mb-2 mt-3 gap-x-4">
              {Object.values(reviews?.review)
                ?.slice(0, showReview ? reviews.length : 6)
                ?.map((e, i) => {
                  return <ReviewBlock data={e} key={i} index={i} />;
                })}
            </div>
            {Object.values(reviews?.review)?.length > 9 && !showReview && (
              <button
                onClick={() => {
                  setShowReview(!showReview);
                }}
                className="mb-6 md:ml-3 mt-3 flex items-center text-lg text-gray-300"
              >
                Show More <AiOutlineDown className="ml-3" />
              </button>
            )}
          </>
        ) : (
          <div className="flex items-center py-10 justify-center">
            <Oval
              visible={true}
              height="40"
              width="40"
              color="#fff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    loading && (
      <div className="flex items-center py-10 justify-center">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="#fff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  );
};

const Actor = ({ e }) => {
  return (
    <div className="flex items-center">
      <img
        src={
          e?.image?.includes("https")
            ? e?.image
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt={e?.name}
        width={1000}
        height={1000}
        className="rounded-full w-[12vw] md:w-[5vw] h-[12vw] md:h-[5vw] object-cover"
      />
      <div className="ml-3">
        <h1 className="text-lg font-medium">{e?.name}</h1>
        <h1 className="text-gray-300">{e?.character}</h1>
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  const { setData } = useContext(Context);
  return (
    <div
      onClick={(e) => {
        setData(data);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="border rounded-md p-4 md:p-2 border-gray-500 cursor-pointer transition-all hover:scale-105"
    >
      <img
        alt={data?.about?.movie}
        src={data?.poster}
        width={1000}
        height={1000}
        className="object-cover h-[50vh] rounded-md"
      />
      <p className="line-clamp-1 mt-2 font-bold text-lg">
        {data?.about?.movie}
      </p>
      <p className="text-gray-300 line-clamp-2">{data?.description}</p>
      <div className="flex items-center mt-2 line-clamp-1">
        {data?.title_data?.map((e, i) => {
          return (
            <p
              key={i}
              className="px-3 border rounded-full mr-2 text-sm text-gray-300 border-gray-300"
            >
              {e}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const ReviewBlock = ({ data, index }) => {
  const { reviews } = useContext(Context);
  const [state, setState] = useState(false);
  const [sentiment, setSentiment] = useState("");

  useEffect(() => {
    let arr = [
      reviews?.positive[index],
      reviews?.negative[index],
      // reviews?.neutral[index],
    ];
    let maxVal = Math.max(...arr);
    let maxIndex = arr.indexOf(maxVal);
    setSentiment(maxIndex);
  }, [data]);

  return (
    <div
      className={`border py-1 px-2 h-fit rounded-md border-gray-300 cursor-pointer ${
        sentiment == 0
          ? "border-green-300"
          : sentiment == 1
          ? "border-red-300"
          : "border-yellow-300"
      }`}
      onClick={(e) => {
        setState(!state);
      }}
    >
      <div className="flex items-start justify-between w-full">
        <h1 className={`${state ? "line-clamp-0" : "line-clamp-1"} text-lg`}>
          {reviews?.title[index]}
        </h1>
        {reviews?.rating[index] && (
          <p className="text-gray-300">{reviews?.rating[index]}/10</p>
        )}
      </div>
      <p
        className={`${
          !state ? "line-clamp-2" : "line-clamp-0"
        } text-gray-300 px-1`}
      >
        {data}
      </p>
      {reviews?.date[index] && (
        <p className="text-gray-300 text-end mt-1">{reviews?.date[index]}</p>
      )}
    </div>
  );
};

export default App;
