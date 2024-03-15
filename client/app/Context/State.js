"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { BASE_URL } from "../Utils";

const B2BState = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState();
  const [recommendationsData, setRecommendationsData] = useState();
  const [data, setData] = useState();
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(false);

  const get_prediction = (e) => {
    setSearchResults([]);
    axios
      .get(`${BASE_URL}/predict?movie_name=${e}`)
      .then((res) => {
        setRecommendations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get_reviews = (e) => {
    axios
      .get(`${BASE_URL}/get-reviews?id=${e}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (recommendations?.length > 0) {
      setRecommendationsData([]);
      setReviews([]);
      const temp = [];
      const fetchDetails = async () => {
        for (let i = 0; i < recommendations.length; i++) {
          try {
            const response = await axios.get(
              `${BASE_URL}/get-details?id=${recommendations[i]?.movie_id}`
            );
            temp.push(response.data);
          } catch (error) {
            console.error("Error fetching movie details:", error);
          }
        }
        setRecommendationsData(temp);
      };
      fetchDetails();
    }
  }, [recommendations]);

  useEffect(() => {
    if (data?.about?.movie_id) {
      setRecommendationsData([]);
      setReviews([]);
      get_prediction(data?.about?.movie_id);
      get_reviews(data?.about?.movie_id);
    }
  }, [data]);

  return (
    <Context.Provider
      value={{
        searchResults,
        setSearchResults,
        recommendations,
        setRecommendations,
        data,
        setData,
        recommendationsData,
        get_prediction,
        get_reviews,
        reviews,
        loading,
        setLoading,
        setRecommendationsData,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default B2BState;
