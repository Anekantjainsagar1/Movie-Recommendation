"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { BASE_URL } from "../Utils";

const B2BState = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([
    {
      movie: "Thugs (2023)",
      movie_id: "tt23951484",
      movie_name: "Thugs",
      percentage: 42.26,
    },
    {
      movie: "Japan (2023)",
      movie_id: "tt23474462",
      movie_name: "Japan",
      percentage: 39.53,
    },
    {
      movie: "Martin (2023)",
      movie_id: "tt15334030",
      movie_name: "Martin",
      percentage: 39.13,
    },
    {
      movie: "Anek (2022)",
      movie_id: "tt13919802",
      movie_name: "Anek",
      percentage: 37.96,
    },
    {
      movie: "Weapon",
      movie_id: "tt27440937",
      movie_name: "Weapon",
      percentage: 36.51,
    },
  ]);
  const [recommendationsData, setRecommendationsData] = useState([
    {
      about: {
        movie: "Thugs (2023)",
        movie_id: "tt23951484",
        movie_name: "Thugs",
        tags: "thug 2023 action thriller live gangster kanyakumari brindamast hridhuharoon sarathkumar munishkanth",
        year: "2023",
      },
      actors_data: [
        {
          character: "Sethu",
          image:
            " https://m.media-amazon.com/images/M/MV5BM2JkYTEyZjMtNjEwZi00MzQzLWE3NmYtYTk1YjYyNzVmMjk5XkEyXkFqcGdeQXVyMzQ0NTk5NzU@._V1_QL75_UY280_CR70",
          name: "Hridhu Haroon",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BZjYwNThmOTgtNjcyMC00Mzc2LTgxZDQtOGU3MzkwMjQyOTBlXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_QL75_UX280_CR0",
          name: "Sarath Kumar",
        },
        {
          character: "Friend",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Moor",
        },
        {
          character: "Marudhu",
          image:
            " https://m.media-amazon.com/images/M/MV5BMTQwNDVmNTQtY2MxNS00ZmQ5LWI2ZTMtMDZiMWIxODFkNjkyXkEyXkFqcGdeQXVyMTU0MzI1OTY@._V1_QL75_UY280_CR71",
          name: "Munishkanth",
        },
        {
          character: "Annachi",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Thenappan P.L.",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Sooraj Pops",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BNDJhODhlYWUtNGEyNy00YWVlLTljNjctZTdkMWM3ZjdiZjU1XkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_QL75_UX280_CR0",
          name: "Anaswara Rajan",
        },
        {
          character: "Kalaiyan",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Bharathi Saravanan",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Ramya Sekar",
        },
        {
          character: "Durai",
          image:
            " https://m.media-amazon.com/images/M/MV5BMzdkOTdmMzAtYjM4Ny00MWYzLWE1MWYtM2IzOWFiMmE1M2Y3XkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UY280_CR70",
          name: "Bobby Simha",
        },
        {
          character: "Doss",
          image:
            " https://m.media-amazon.com/images/M/MV5BMjYzZTIwZTYtNzRmMy00YzI5LWFlNjAtN2Y0ZjFjNWU2NzQxXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_QL75_UX280_CR0",
          name: "R.K. Suresh",
        },
      ],
      amazon_award: null,
      big_awards: null,
      description: "The lives of a few gangsters in Kanyakumari.",
      director: "Brinda Master",
      final_stars: ["Hridhu Haroon", "Sarath Kumar", "Moor"],
      final_writers: [],
      music_data: [],
      poster:
        "https://m.media-amazon.com/images/M/MV5BOTJiNWYyZWEtNTkwOS00MjgzLThmMjQtNGZhMjNjOGQ1ODhmXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
      rating: 6.4,
      rating_people: "422",
      title_data: ["Action", "Thriller"],
    },
    {
      about: {
        movie: "Japan (2023)",
        movie_id: "tt23474462",
        movie_name: "Japan",
        tags: "japan 2023 action drama thriller plot wrap rajumurugan sunil karthi anuemmanuel rajeshaggarw",
        year: "2023",
      },
      actors_data: [
        {
          character: "Japan Muni",
          image:
            " https://m.media-amazon.com/images/M/MV5BZTI4MDA3ZTYtMDg1OC00MTY1LWE4NjYtZWM2NTRlNGQ2OWU4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTU0MzI1OTY@._V1_QL75_UX280_CR0",
          name: "Karthi",
        },
        {
          character: "Sridhar",
          image:
            " https://m.media-amazon.com/images/M/MV5BYzljYzFhYWQtMDQxYy00OWVkLTgzNGMtMTVkMWM5NGI4MDk3XkEyXkFqcGdeQXVyNDc2NzU1MTA@._V1_QL75_UY280_CR48",
          name: "Sunil",
        },
        {
          character: "Sanju Kutty",
          image:
            " https://m.media-amazon.com/images/M/MV5BOTE5MzA1MjItNjJkMS00OTcxLTk1MjktODlkZDdmOGViMzA2XkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_QL75_UX280_CR0",
          name: "Anu Emmanuel",
        },
        {
          character: "Minister Pazhanisamy",
          image:
            " https://m.media-amazon.com/images/M/MV5BY2I2NzAwYjEtZTE1Zi00YTEzLWJjY2EtODU1M2IyZDc4OGIyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
          name: "K.S. Ravikumar",
        },
        {
          character: "Actor",
          image:
            " https://m.media-amazon.com/images/M/MV5BMGI4OGI4YjEtODI3OC00ZjQ5LWJkYTAtNWZkMGJlMGVhMTU5XkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
          name: "Motta Rajendran",
        },
        {
          character: "Boomer",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Bava Chelladurai",
        },
        {
          character: "Director",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Arunraja Kamaraj",
        },
        {
          character: "Film Producer",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "C.V. Kumar",
        },
        {
          character: "Gangadhar",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Jithan Ramesh",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Sajol Chowdhury",
        },
        {
          character: "Karuppasamy",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Vijay Milton",
        },
        {
          character: "Perinbam",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Chandrasekhar",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Ashna Sudheer",
        },
        {
          character: "Mitesh",
          image:
            " https://m.media-amazon.com/images/M/MV5BNTk4MDE5MzYtYTdiMS00OWRlLTg4OGUtMzY0MjYxYWM5MTE3XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_QL75_UX280_CR0",
          name: "Rajesh Aggarwal",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "TSR Srinivasan",
        },
        {
          character: "Radha",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Navaneeth",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Meesai Rajendran",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Jyothika Sahoo",
        },
      ],
      amazon_award: null,
      big_awards: "$114,919",
      description:
        "A daring robbery in a jewellery showroom kickstarts the hunt for Japan, a notorious robber, who is a law unto himself.",
      director: "Raju Murugan",
      final_stars: ["Karthi", "Sunil", "Anu Emmanuel"],
      final_writers: ["C. Murugesh Babu", "Raju Murugan"],
      music_data: [],
      poster:
        "https://m.media-amazon.com/images/M/MV5BYWIxZjg2NjEtNDA2NC00Njk4LWFmZDMtZWFhZmYzZTFjZmRlXkEyXkFqcGdeQXVyMTY1MzAyNjU4._V1_.jpg",
      rating: 3.1,
      rating_people: "2.1K",
      title_data: ["Action", "Comedy", "Crime"],
    },
    {
      about: {
        movie: "Martin (2023)",
        movie_id: "tt15334030",
        movie_name: "Martin",
        tags: "martin 2023 action drama thriller journey man discov find love fight motherland hold fort three gate dhruvasarja vaibhavishandilya sriramreddypolasan nawabshah",
        year: "2023",
      },
      actors_data: [
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Dhruva Sarja",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BMTkxM2RjYmItMzVkZi00ZDg5LThkYjktNzEyNzMwZDI1ZGM2XkEyXkFqcGdeQXVyNDc2NzU1MTA@._V1_QL75_UX280_CR0",
          name: "Vaibhavi Shandilya",
        },
        {
          character: "Surgeon",
          image:
            " https://m.media-amazon.com/images/M/MV5BMmI4ZWY0YjgtOGY1MS00YWRhLTlhYTEtMGM3MGI5NTI2MjcwXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_QL75_UX280_CR0",
          name: "Sriram Reddy Polasane",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BMTgxMzAyNTM1Ml5BMl5BanBnXkFtZTgwNzIzMjgzOTE@._V1_QL75_UX280_CR0",
          name: "Nikitin Dheer",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BMTJkY2MxOTctNmNjNC00NGYxLWFhNGItY2RhZjI0ODczNDI4XkEyXkFqcGdeQXVyMDkwNTkwNg@@._V1_QL75_UY280_CR31",
          name: "Giorgia Andriani",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BYzJlZjc5YmEtMzMyOS00YjEyLTgyY2UtM2RlYmVkMjMzYTUxXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_QL75_UX280_CR0",
          name: "Anveshi Jain",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BMjllNzM2YjctZjYxMi00Y2NkLWIyYzQtZmQwN2NlNGQ0NzkyXkEyXkFqcGdeQXVyNzY3MTExNTA@._V1_QL75_UX280_CR0",
          name: "Achyuth Kumar",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BZGY4ZDQ4ZjAtYzNjMy00ZDNhLWI0NGQtMmJlMTU5OTdkNzQ0XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_QL75_UY280_CR190",
          name: "Nawab Shah",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BOGE1ZjBhZmItMDc4Ni00ZjcwLTkwNjYtMTJlYjZlYTYyY2Y1XkEyXkFqcGdeQXVyNzY3MTExNTA@._V1_QL75_UX280_CR0",
          name: "Sadhu Kokila",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BZTM2NzZiMWQtYTY3Yy00YjgyLWJlMjQtMThhZDVmNjk3YjlmXkEyXkFqcGdeQXVyNzY3MTExNTA@._V1_QL75_UX280_CR0",
          name: "Chikkanna",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BN2ZlODU3OGMtMTc2MC00ZGM4LTk3YmItZTU1MDM2N2Y3M2ZhXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_QL75_UY280_CR140",
          name: "Malavika Avinash",
        },
        {
          character: "Fighter",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Aarash Shah",
        },
        {
          character: null,
          image:
            " https://m.media-amazon.com/images/M/MV5BY2Y3NDQ0MjgtMzIwMC00OWI5LTliYmMtOTg2NWZmMzY2NDUyXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_QL75_UX280_CR0",
          name: "Rohit Pathak",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Sukrutha Wagle",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Girija Lokesh",
        },
      ],
      amazon_award: null,
      big_awards: null,
      description:
        "A journey of a man discovering himself, finding love and fighting for his motherland. Can he hold the fort on all three gates?",
      director: "A.P. Arjun",
      final_stars: [
        "Dhruva Sarja",
        "Vaibhavi Shandilya",
        "Sriram Reddy Polasane",
      ],
      final_writers: [],
      music_data: [],
      poster:
        "https://m.media-amazon.com/images/M/MV5BYTI0MWZmZDgtODI3Ny00ZmQ0LWE1MTEtYzdlN2Q0YzdlYzVmXkEyXkFqcGdeQXVyMTA1NzEzOTU1._V1_.jpg",
      rating: null,
      rating_people: [],
      title_data: ["Action", "Drama", "Thriller"],
    },
    {
      about: {
        movie: "Anek (2022)",
        movie_id: "tt13919802",
        movie_name: "Anek",
        tags: "anek 2022 action drama sport socio polit action thriller set geopolit backdrop northeast india anubhavsinha ayushmannkhurrana andreakevich\u00fcsa manojpahwa kumudmishra",
        year: "2022",
      },
      actors_data: [
        {
          character: "Joshua",
          image:
            " https://m.media-amazon.com/images/M/MV5BYzc5YTA3NjctY2Q1ZS00YjllLWIzNzktOTgxZTA4ZTk4MDEzXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_QL75_UX280_CR0",
          name: "Ayushmann Khurrana",
        },
        {
          character: "Aido",
          image:
            " https://m.media-amazon.com/images/M/MV5BYTVkZjIzYTEtNWUzNC00ZWZkLTgwNjUtN2FlNDNlZTdkZWRhXkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_QL75_UX280_CR0",
          name: "Andrea Kevich\u00fcsa",
        },
        {
          character: "Abrar Bhatt",
          image:
            " https://m.media-amazon.com/images/M/MV5BMDM4MTY3YzAtYmJlMC00YjdjLTg4YzgtZTJiMzI5NzJjODg2XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_QL75_UX280_CR0",
          name: "Manoj Pahwa",
        },
        {
          character: "Divakar",
          image:
            " https://m.media-amazon.com/images/M/MV5BNWY2YTdhY2QtMzMxMS00MjNhLTgxYmQtMjM2OGM4MjczNzBmXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_QL75_UX280_CR0",
          name: "Kumud Mishra",
        },
        {
          character: "Tiger Sanga",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Loitongbam Dorendra Singh",
        },
        {
          character: "IPS Anjanaiyya Bellamkonda",
          image:
            " https://m.media-amazon.com/images/M/MV5BOTlkOTQzOTUtZDdmZC00MzJhLWE2YzgtNmFkZDZjNmRhNzgzXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
          name: "J.D. Chakravarthi",
        },
        {
          character: "Wangnao",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Mipham Otsal",
        },
        {
          character: "Maj. Veer",
          image:
            " https://m.media-amazon.com/images/M/MV5BODYyZTZiY2UtOGU3Zi00NGM0LTlhNGMtYmE1YTY4NjhmNGEzXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_QL75_UX280_CR0",
          name: "Jatin Goswami",
        },
        {
          character: "Niko",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Thejasevor Belho",
        },
        {
          character: "Johnson",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Rajib Kro",
        },
        {
          character: "Emma",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Sheila Devi",
        },
        {
          character: "Sampat",
          image:
            " https://m.media-amazon.com/images/M/MV5BODJmNWZjMjctODBjZC00MWY2LTliNjctN2MzZTViZGY3ZTdkXkEyXkFqcGdeQXVyMjQ2MDI5ODE@._V1_QL75_UX280_CR0",
          name: "Sushil Pandey",
        },
        {
          character: "Haryana Boxing Coach",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Rajendra Sethi",
        },
        {
          character: "Horen",
          image:
            " https://m.media-amazon.com/images/M/MV5BMjQwZTNiYjUtYzE4Zi00YTVkLWIyOGQtOTlkNTMxMjhhNjkwXkEyXkFqcGdeQXVyMzQ0NTk5NzU@._V1_QL75_UX280_CR0",
          name: "Lanuakum Ao",
        },
        {
          character: "TV Journlist",
          image:
            " https://m.media-amazon.com/images/M/MV5BMGNkYjk5MTktZTNiYi00NjE0LWI4N2EtZTIxYjgyMzY2ZDRlXkEyXkFqcGdeQXVyNzM4MjU3NzY@._V1_QL75_UX280_CR0",
          name: "Meghna Malik",
        },
        {
          character: "Neil",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Anup Hazarika",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Deeplina Deka",
        },
        {
          character: "Delhi Police Cop",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Sima Pari",
        },
      ],
      amazon_award: null,
      big_awards: "1 win & 6 nominations",
      description:
        "A socio political, action thriller set against the geopolitical backdrop of Northeast India.",
      director: "Anubhav Sinha",
      final_stars: [
        "Ayushmann Khurrana",
        "Andrea Kevich\u00fcsa",
        "Manoj Pahwa",
      ],
      final_writers: ["Sima Agarwal", "Yash Keswani", "Anubhav Sinha"],
      music_data: [],
      poster:
        "https://m.media-amazon.com/images/M/MV5BYzNiNDM4NjYtZDMyMS00YTgyLWIzMWYtNmFhMjBiNWJiN2RjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
      rating: 6.4,
      rating_people: "22K",
      title_data: ["Action", "Drama", "Sport"],
    },
    {
      about: {
        movie: "Weapon",
        movie_id: "tt27440937",
        movie_name: "Weapon",
        tags: "weapon action thriller add plot guhansenniappan vasanthravi shiyaskareem sathyaraj tanyahop",
        year: 0,
      },
      actors_data: [
        {
          character: "Mithran",
          image:
            " https://m.media-amazon.com/images/M/MV5BMmE2MzUxYTktNTc3My00NWVkLWJiNzMtNjk4ZGEwMWFiZjUwXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
          name: "Sathyaraj",
        },
        {
          character: "Agni",
          image:
            " https://m.media-amazon.com/images/M/MV5BYTAzZWJiNDItMDVhNS00YzRkLTg3YjMtNWY2YTM4MzY0NzM1XkEyXkFqcGdeQXVyNDAyMjk2NDI@._V1_QL75_UY280_CR167",
          name: "Vasanth Ravi",
        },
        {
          character: "Avantika",
          image:
            " https://m.media-amazon.com/images/M/MV5BNWE1NWNjMmUtMTY2MC00NTg4LWJmNjEtYTkzODU2NDhlMDEwXkEyXkFqcGdeQXVyMzYxOTQ3MDg@._V1_QL75_UX280_CR0",
          name: "Tanya Hope",
        },
        {
          character: "Dev Krishnav",
          image:
            " https://m.media-amazon.com/images/M/MV5BZTQ1NTgyMzctYWFkZi00YzMyLWEwNTQtZGYyMzAzNDU5OTZmXkEyXkFqcGdeQXVyNDc2NzU1MTA@._V1_QL75_UX280_CR0",
          name: "Rajiv Menon",
        },
        {
          character: "Commander Solomon",
          image:
            " https://m.media-amazon.com/images/M/MV5BZDE2NTIyODAtOWYyOS00ZmFiLThkZTUtOTMwMTk4OTJlZWI5XkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_QL75_UX280_CR0",
          name: "Rajeev Pillai",
        },
        {
          character: "Terasa",
          image:
            " https://m.media-amazon.com/images/M/MV5BM2IxZGE4Y2MtNzA1MC00NWFhLTkzNjMtZjNjMWQ5YjlmN2I2XkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
          name: "Yaashika Aanand",
        },
        {
          character: "Punniyavan",
          image:
            " https://m.media-amazon.com/images/M/MV5BMzMzYWM5ZmYtZGE2ZC00ZmI2LTkzM2MtM2RiZmJkNmQwMTBlXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
          name: "Mime Gopi",
        },
        {
          character: "Virat",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Shiyas Kareem",
        },
        {
          character: "Akira",
          image:
            " https://m.media-amazon.com/images/M/MV5BMWY3MDg5OTgtZjAzYi00YjZmLTlkMzEtNzk3ODZiNzM0YjRkXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
          name: "Maya S. Krishnan",
        },
        {
          character: "Damini",
          image:
            " https://m.media-amazon.com/images/M/MV5BNTRiNmNjMjUtNGUxYy00MGNiLWIyY2EtYTExZmVkZGU3YWQ4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_QL75_UX280_CR0",
          name: "Kaniha",
        },
        {
          character: "Omkar",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Velu Prabhakaran",
        },
        {
          character: "Bakthavachalam",
          image:
            " https://m.media-amazon.com/images/M/MV5BMDViZTI0ZTAtYjE5NS00YjUzLWJlODYtNmY2Y2ViNGFhNmI1XkEyXkFqcGdeQXVyMzYxOTQ3MDg@._V1_QL75_UY280_CR20",
          name: "Gajaraj",
        },
        {
          character: "Sivaraj",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Kumar Natarajan",
        },
        {
          character: "Barathraj",
          image:
            " https://m.media-amazon.com/images/M/MV5BMDMxYTcyMmQtYjhkNS00MTRiLWJlNWEtODlmMDlkZWY3ZjMwXkEyXkFqcGdeQXVyMTUzNjEwNjM2._V1_QL75_UY280_CR70",
          name: "Baradwaj Rangan",
        },
        {
          character: "Vedanth",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Syed Subahan",
        },
        {
          character: "Rishi",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Benito Franklin",
        },
        {
          character: null,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          name: "Raghu Esakki",
        },
      ],
      amazon_award: null,
      big_awards: "\u20b9200,000,000 (estimated)",
      description: "",
      director: "Guhan Senniappan",
      final_stars: ["Sathyaraj", "Vasanth Ravi", "Tanya Hope"],
      final_writers: [],
      music_data: [],
      poster:
        "https://m.media-amazon.com/images/M/MV5BNzU3NDI2NzAtMzFjYS00ZjEyLTkyMzItYmVmYzA1OTI4ZDk1XkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_.jpg",
      rating: null,
      rating_people: [],
      title_data: ["Action", "Sci-Fi", "Thriller"],
    },
  ]);
  const [data, setData] = useState({
    about: {
      movie: "Jawan (2023)",
      movie_id: "tt15354916",
      movie_name: "Jawan",
      tags: "jawan 2023 action thriller action thriller outlin emot journey man set rectifi wrong societi atle shahrukhkhan nayanthara vijaysethupathi deepikapadukon",
      year: "2023",
    },
    actors_data: [
      {
        character: "Vikram Rathore",
        image:
          " https://m.media-amazon.com/images/M/MV5BZDk1ZmU0NGYtMzQ2Yi00N2NjLTkyNWEtZWE2NTU4NTJiZGUzXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_QL75_UX280_CR0",
        name: "Shah Rukh Khan",
      },
      {
        character: "Narmada",
        image:
          " https://m.media-amazon.com/images/M/MV5BYWIwOTMwNGEtNjE2MS00YzU1LTk0ZjktMzY1M2FmZGNiM2MxXkEyXkFqcGdeQXVyMTA1OTMzNTQw._V1_QL75_UX280_CR0",
        name: "Nayanthara",
      },
      {
        character: "Kalee Gaikwad",
        image:
          " https://m.media-amazon.com/images/M/MV5BZDg5MmIyNjUtYjQwNC00NzY0LWE0OTgtMzUxNzU5MmI2MTc5XkEyXkFqcGdeQXVyMTYzMDI0ODk1._V1_QL75_UX280_CR0",
        name: "Vijay Sethupathi",
      },
      {
        character: "Aishwarya Rathore",
        image:
          " https://m.media-amazon.com/images/M/MV5BNGFlYzAyYjgtNzRjNS00NmE4LTliOGYtYzBkYzU5MzRhMDM0XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_QL75_UX280_CR0",
        name: "Deepika Padukone",
      },
      {
        character: "Madhavan Naik",
        image:
          " https://m.media-amazon.com/images/M/MV5BNzU2NTgwNzY1OF5BMl5BanBnXkFtZTcwMjQxNzcxOA@@._V1_QL75_UY280_CR70",
        name: "Sanjay Dutt",
      },
      {
        character: "Lakshmi",
        image:
          " https://m.media-amazon.com/images/M/MV5BZGE5MjQwYjEtNGE0NC00YTQ3LTliYWQtMjQ0MTYxNTBkYWQ4XkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
        name: "Priyamani",
      },
      {
        character: "Eeram",
        image:
          " https://m.media-amazon.com/images/M/MV5BMzUzNjQ4MTE2OF5BMl5BanBnXkFtZTgwNTk0NjcyNzM@._V1_QL75_UX280_CR0",
        name: "Sanya Malhotra",
      },
      {
        character: "Ishkra",
        image:
          " https://m.media-amazon.com/images/M/MV5BNmNmOTY5OTItMzYyYy00MDA0LTliNjYtYmViNWMzYjYyNTYwXkEyXkFqcGdeQXVyMjQ2MDI5ODE@._V1_QL75_UY280_CR21",
        name: "Girija Oak",
      },
      {
        character: "Kalki",
        image:
          " https://m.media-amazon.com/images/M/MV5BMTY2NjY5MjQxOF5BMl5BanBnXkFtZTgwMDk2NDQ3NjE@._V1_QL75_UY280_CR70",
        name: "Lehar Khan",
      },
      {
        character: "Helena",
        image:
          " https://m.media-amazon.com/images/M/MV5BYzA5ZWE0ZmItNWRmYi00YTQ0LWFmMDItNjA0OGNiNTkwMDNjXkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_QL75_UX280_CR0",
        name: "Sanjeeta Bhattacharya",
      },
      {
        character: "Janvi",
        image:
          " https://m.media-amazon.com/images/M/MV5BMmY5NWRhZjItNTQ1ZC00ZWRkLWJlNDQtNTMyMjE4YTQyMGUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_QL75_UY280_CR126",
        name: "Aaliyah Qureishi",
      },
      {
        character: "Irani",
        image:
          " https://m.media-amazon.com/images/M/MV5BNTAyMjU0NjItZjc3Ny00ZjdjLTgyNjMtNzVhYjE1MDYxM2NhXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_QL75_UY280_CR84",
        name: "Sunil Grover",
      },
      {
        character: "Kaveri",
        image:
          " https://m.media-amazon.com/images/M/MV5BMTdlMjhlYWEtMzgyOC00YWU4LTgzZDgtMTM4NmE5ZWM4MGM4XkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_QL75_UX280_CR0",
        name: "Ridhi Dogra",
      },
      {
        character: "Suji",
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        name: "Seeza Saroj Mehta",
      },
      {
        character: "Pappu (TAMIL)",
        image:
          " https://m.media-amazon.com/images/M/MV5BYjNlMTU4MmMtM2IxMy00MjQ3LWJlYmQtZWYwNjM1MjU2MTAyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_QL75_UX280_CR0",
        name: "Yogi Babu",
      },
      {
        character: "Pappu (HINDI)",
        image:
          " https://m.media-amazon.com/images/M/MV5BNTk1MWQ3NmMtNTI3Yi00ZDNjLWIyMWYtZGJhZWYwODRiZWRmXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_QL75_UX280_CR0",
        name: "Mukesh Chhabra",
      },
      {
        character: "Alia",
        image:
          " https://m.media-amazon.com/images/M/MV5BYjVhNGQwNjMtYTU2Yi00N2EzLWE3Y2ItMGYzYTQwNzIxMmVhXkEyXkFqcGdeQXVyMzQ0NTk5NzU@._V1_QL75_UX280_CR0",
        name: "Ashlesha Thakur",
      },
      {
        character: "New Jailor",
        image:
          " https://m.media-amazon.com/images/M/MV5BMWUyMDIzNWMtODkwNS00M2Q1LTg2YjktMWJmNTViNjAyNDE1XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_QL75_UX280_CR0",
        name: "Siddharth Bhardwaj",
      },
    ],
    amazon_award: null,
    big_awards: "16 wins & 38 nominations",
    description:
      "A prison warden recruits inmates to commit outrageous crimes that shed light on corruption and injustice - and that lead him to an unexpected reunion.",
    director: "Atlee",
    final_stars: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"],
    final_writers: ["Sumit Arora", "Atlee", "Ramanagirivasan"],
    music_data: [
      "Jawan Prevue Theme (Hindi)",
      "Music by Anirudh Ravichander",
      "Lyrics by Raja Kumari",
      "Performed by Anirudh Ravichander, BNiznik, Raja Kumari",
    ],
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWI5NmU3NTUtOTZiMS00YzA1LThlYTktNDJjYTU5NDFiMDUxXkEyXkFqcGdeQXVyMTUzNjEwNjM2._V1_.jpg",
    rating: 7,
    rating_people: "93K",
    title_data: ["Action", "Drama", "Musical"],
  });
  const [reviews, setReviews] = useState([
    {
      date: "15 September 2023",
      name: "wrdcwrdc",
      rating: "8",
      review:
        "KThe movie was amaazing the story and everything how its gone from the very vegining it was all action and amaaaazing and bever stoped the action from action to action ... but he should have focused more on the helping others and dont aim for that evil ... that time when he aimed for his cash ... and another point i didnt get it yet and its bad for his reputation when he go to marry that girl .. he did t purely liked her so what was the point ??! Other than that he was trully roben hood ... also it would have beeen much better if in the ebd the people helped him in critical situations.AIts more to the comedey side so i cant reaaaaly talk about it , but about the action and things how they happened i lost there .. they should have but some history or date much better ,,, and the music ohhhhh its from another world ,,, im as a male got shyed how are the girls ,, its a bit hard.",
      title: "K & A",
    },
    {
      date: "24 September 2023",
      name: "akshatmahajan",
      rating: "9",
      review:
        "The movie was entertaining with blend of a lot of drama, little comedy, some thrill, some suspense and a lot of action. The story was good with a good message in it, the screenplay was uneven but doesn't damages the story, the direction was good and the performances were also good. The BGM and the action scenes were great, you will love them. Also, the message the movie wanted to show was good and effective.Some scenes were rushed and some things remained unexplained but the story is shown in such a grand way that these things will not bother you that much.Overall, you should definitely give this movie a try.",
      title: "Full on entertainment",
    },
    {
      date: "4 October 2023",
      name: "rgshinde-65423",
      rating: "10",
      review:
        "This movie is really a must watch in theatre.I went in with little expectations and came out really amazed.SRK has really shown his best in this movie, his acting seems on pointmusic action story of this film is all greatall actors have done great.This is the magic of filmmaking which takes you to the world of amazement, thats what i felt watching this in theatremovie also has social message in movies on few issues with todays society and those do make a huge impact on connecting with the cast.This is a total family movie, no vulgarity at allwe would love to see more such collab between bollywood actors and tollywood makers.",
      title: "must watch in theatre",
    },
    {
      date: "16 September 2023",
      name: "alifarazpbh",
      rating: "8",
      review:
        '"Jawan" is a dynamic action film that manages to pack a punch while also delving into profound emotional and social issues. The movie maintains a relentless pace, weaving its narrative with impactful action sequences that are heightened by the presence of genuine emotion.**Balancing Action and Emotion (8/10):**\n"Jawan" finds the delicate equilibrium between high-octane action and heartfelt emotion. This unique blend not only entertains but also gives depth to the action sequences, making them more resonant with the audience. It\'s evident that the filmmakers aimed to create an action film with a heart, and they succeeded in doing so.**Addressing Social and Political Issues (9/10):**\nThe film takes a bold step by addressing pressing social and political concerns. What\'s notable is its impartial approach; "Jawan" isn\'t politically biased but instead scrutinizes the systemic flaws ingrained in our society. This choice ensures that its message remains universally relevant.**Pacing and Emotional Depth (7/10):**\nWhile the movie\'s fast tempo adds to its excitement, it occasionally hampers the emotional depth of certain scenes. Slowing down at times could have allowed for more profound exploration of the characters\' feelings and experiences. Nonetheless, the film manages to forge a connection between the audience and its characters.**Cinematic Brilliance (9/10):**\nVisually, "Jawan" is a work of art. The cinematography is nothing short of exceptional, immersing viewers in a visually captivating world. The film\'s stunning visuals contribute significantly to its overall allure, making it a cinematic treat.**Music and Score (8/10):**\nWhile the movie\'s songs may not be its strongest suit, the background music is stellar. It enhances crucial scenes, adding depth and intensity to the storytelling. The score elevates the overall quality of the film.**Outstanding Performances (9/10):**\nShahrukh Khan delivers a remarkable performance that steals the show. His portrayal is compelling and authentic, adding layers to his character. Vijay Sethupathi\'s presence is a welcome addition to the ensemble cast, contributing to the film\'s overall excellence.**Conclusion (8/10):**\n"Jawan" is an action-packed thriller that doesn\'t forget to carry a social conscience. It successfully navigates the terrain of action and emotion, offering audiences a unique cinematic experience. While pacing issues may hinder emotional connections at times, the film\'s cinematic brilliance, strong performances, and impactful background score make it a must-watch. "Jawan" not only entertains but also provokes thought on the systemic issues it confronts, making it a compelling addition to the action genre.',
      title: "An Action-Packed Thriller with a Social Conscience",
    },
    {
      date: "10 September 2023",
      name: "cs_rahul_prasad",
      rating: "10",
      review:
        "If Pathaan placed Shah Rukh Khan in the top position after a series of dismal box office duds, his latest, Jawan, directed by Atlee, will cement his position as the king of the box office. Jawan has all the elements of a quintessential Bollywood blockbuster. Whistle-inducing dialogues and action sequences, a credible plot, woman power, foot-tapping music, a bevy of stars, and of course Khan himself. Atlee masterfully crafts a tale that showcases Shah Rukh Khan in all his glory - and if you aren't happy with one - the film offers two of them - both brawny, flexing muscles, hitting goons and charming everyone around with complete ease.Jawan's plot takes a while to set in. It opens with a bandaged man saving a remote village, presumably in Ladakh from a bunch of invaders. The film then cuts to 30 years later when a battered, bandaged, bald madman takes a metro train in Mumbai hostage. He has his aids, a bunch of smart, stealthy women dressed in combat uniforms, well versed with hacking the system. Officer Narmada Rai (Nayanthara) is summoned to negotiate with the man, who dances to Bekarar Karke Hume and cracks dry jokes as he narrates the story of a farmer who died a few years back unable to repay his loans to the authorities. When Narmada asks what would make him free his hostages, the man states he wants Rs 4 billion to be transferred from billionaire and arms dealer Kaali's (Vijay Sethupathi) account within a few minutes.The police give in to his demands, and he, along with his girls, disappears leaving all the hostages charmed. So much so that they turn hostile towards the case. Turns out the man is an IPS officer and head of a women's jail in Mumbai, Azaad Rathore (SRK) who has turned a bunch of inmates from the jail into vigilantes. These women have all landed in the said jail due to wrong allegations and have had a transformative life inside the jail, thanks to their captain.Azaad meanwhile unknowingly befriends Narmada's daughter who wants him to become her father. A single mother, Narmada agrees to marry Azaad after she sees her daughter's fondness for the man. Narmada, of course, can't recognise Azaad as he works in disguise. As cases of heists increase, Narmada takes it upon herself to nab the culprits. Would she know Azaad's truth? And what motivates Azaad to stage such heists? Atlee forms an intricate story that goes back and forth in time - keeping the viewers hooked with multiple subplots.Pathaan reiterated SRK's liberal stance and Jawaan brings forth the feminist side of the actor. Khan has been a vocal ally for women's empowerment for years. In Jawan, sure he plays a mentor of sorts to a bunch of wronged women, but the film celebrates strong women and their might to fight it out. All the female characters are projected as strong women who can take on a goon or two on their own and yet be maternal and soft when the time arises. Nayanthara, who makes her Bollywood debut in Jawan, plays a feisty cop who will not slow down even for a second due to familial emotions when duty calls.There's Deepika Padukone in an extended cameo, exubering grace to her character. Sanya Malhotra, Priyamani, and a bunch of girls play SRK's 'gang of girls' who can tackle men double their size.While the film celebrates girl power, it presents SRK in a larger-than-life role. He is in a double role and the older character seemingly gives tribute to Rajinikanth with his walk and talk in almost every scene. The action sequences are elaborate, scenes that are common in action films down south - and are still new to Hindi cinema. Khan, the star of Hindi cinema for decades, eases into the south culture very well, perhaps due to the able direction of Atlee, and looks comfortable doing what he does on screen.Giving SRK company and complementing him in every scene is the very talented Vijay Sethupathi who plays the antagonist. Slightly menacing, and slightly quirky (he gets some of the best lines), Sethupathi helps alleviate some of the most average scenes to another level. It's not a role that demands a lot from the talented actor but he still manages to impress you.The film's music needs special mention. Composer Anirudh, who is a well-known name in Tamil cinema, makes his Bollywood debut and delivers a stellar soundtrack. Foot tapping, refreshing, and unique - Jawan music is hatke from the usual Hindi films. Dialogues by Sumit Arora draw in the claps in the theatre and camerawork by GK Vishnu also impresses.The elaborate fight sequences, some of the scenes, and plot points require a certain suspension of disbelief but Jawan tackles pertinent societal issues in a very commercial setup and manages to throw in entertainment and thrill in between a serious narrative.SRK and Atlee take on the system in Jawan but they take a very complicated route to send out the message. The course is 2 hours 49 minutes long with multiple, elaborate action sequences. It's a tad bit long but still a very thrilling ride. Watch out for the climax sequence, and Sanjay Dutt and Deepika Padukone's cameos.",
      title:
        "Atlee Presents SRK at His Best, Brings The Best Commercial Entertainer of the Year !!!",
    },
    {
      date: "15 September 2023",
      name: "sohomp",
      rating: "10",
      review:
        "This is cinema, peak entertainment. Insane theatrical & cinematic experience, got goosebumps all over. I cannot properly explain the spectrum of emotions I went through, want to live in that moment forever. It's wholesome seeing Shah Rukh Khan in this badass massy avatar, literally a dream come true. His screen presence is at an all-time high, he clearly had the time of his life. Will forever be grateful to Atlee for this. This has one of the best interval block of all time & one of the best SRK entries. So many elevation sequences, you will feel the chills. Action sequences packed a big punch and they are only elevated to another level Anirudh's BGM. SRK broke the 4th wall during his monologue to talk to the audience in his unabashedly political avatar and giving his stance, was extremely powerful. The theatres erupted during Zinda Banda & Not Ramaiya Vastavaiya and people started dancing, that was crazy. Even Imax turned into a single screen. It felt so good dancing with other SRK fans.Deepika in her limited screen time left a big impact. The way she emoted I felt her pain and she made me very emotional. Nayanthara has that aura & power and I understand why they call her lady superstar. They both were stunning. Vijay Sethupathi was very menacing. Other cast members did really well too, the girl gang were on fire. Some of the scenes made me cry, no kidding. The emotions hit right on point.To sum it all up - Anirudh did his thing, Atlee cooked his magic & SRK in his charismatic & electrifying best. Add cool characters & cast, emotions, revenge, mass action & elevation sequences, powerful music, strong social message, colourful visuals and we get this beautiful entertainment package called Jawan that captivates audiences from start to finish with proper blend of masala elements. It's a treat for SRK fans & neutrals alike.After watching thrice already, I can definitely say it has an insane repeat value and gets better & clearer with each rewatch. Will watch again. Audience is in for a nonstop cheers, whistles, claps, shouts, cheering & hooting ride, I am still having a sore throat from all that. It's not a film, it's an emotion that will make you smile and give a heartwarming feeling.",
      title: "Peak entertainment, SRK in his massiest avatar",
    },
    {
      date: "8 October 2023",
      name: "MehdiRizvi-7867",
      rating: "10",
      review:
        "Jawan is one of the best movie of King Khan for me. It must be the biggest hit of Atlee.Character - Most of the character picked up by Family man web series. Including Priyamani, Mehek, Vijay Sethupathi (Farzi) and Muthu (A Tehsildar),Sunil Grover - As per my understanding one of the biggest role that he has received in his career As Irani. What a look, the beard, dressing, shoes, dialogue delivery, action done by Sunil Bhai is outstanding. I love him so much.Priyamani - Priyamani was again done amazing Dance with Shahrukh Khan. First was there in Chennai Express (1234). She must be fortunate by sharing a screen with King Khan. Her physic, voice, dance, and this time totally in action mode with rifle. It was a mind-blowing performance.Vijay Sethupathi - When I was watching his performance, I went to few 90's film and i remember the dashing role of my favourite Danny Denzongpa. The dialogue delivery, action, looks, expressions, timing was speechless and specially his South Hindi accent was Fabulous. Big fan.Sanya Malhotra - She was excellent performer in Jawan. Starting from her first scene in the metro. She has done amazing role as doctor and a team player of Vikram Rathore Team. She has also shown multiple types of action. I guess first time action and come out of comedy role, romantic movies etc.Music - Obviously, the Music director is from Chennai (South). Hence it is expected that whole movie will have south Indian music tadka. Which was ultimate. Loved it. Even the background score is also out of box. The intro music for Kali is Outstanding. No doubt, the intro music for Vikram and Azad as well great.Dance - Very simple simple steps was added in all songs. Which was awesome. Always shot on Joseph Vijay's songs. Loved it.Songs - Awesome song writing. Even as usual so many background dancers have seen, especially in the Zinda banda song.Direction and writing - No doubt. It is fabulous. Even the screenplay was also great and commendable. The farmer scene very well written. The duplicate rifle scene could have been better. Imagine the scene where sealing of the company done by common people. The ungli scene and the message that Vikram Rathore has given all of us as a Common people. Very well written and shoot. The health dept scene was amazing.",
      title:
        "Jawan Is The Best Movie Of All Time Must Watch In Theatres For Amazing Experience",
    },
    {
      date: "7 November 2023",
      name: "PopCulture_Vibe",
      rating: "8",
      review:
        "Jawan, directed by Atlee, is a must-watch for fans of Shah Rukh Khan and action-packed thrillers. The movie delves deeper into the corruption of the system and sheds light on some of the hidden facets of our daily lives. With its seamless integration of stunning CGI effects and a thought-provoking message, Jawan succeeds in captivating its audience from the very beginning.The music, composed by Anirudh Ravichander, perfectly complements the movie's theme and elevates the character of Shah Rukh Khan, who fights against injustice in society and urges people to be wiser in their voting rights in the face of societal challenges.The supporting cast does an excellent job of helping to shape the story, but it is Nayanthara who steals the show as an opposing force to Shah Rukh Khan's Azad. Their on-screen chemistry adds a captivating layer of complexity to the story, further enhancing the film's intrigue.The villain, portrayed masterfully by Vijay Sethupathi, adds tension and an element of danger as the protagonist works to overcome obstacles and achieve his goals of encouraging people to look at society without prejudice towards wealth or social class, urging us to perceive all individuals as equal human beings.Jawan is a movie that skilfully entertains and educates you about different aspects of society, making it a must-watch for all audiences. Whether you're a fan of Shah Rukh Khan or not, the film's action and thrills promise to deliver a gripping experience. Overall, Jawan is an action-packed thriller with a powerful message of social justice that promises to leave a lasting impact.",
      title: "An Action-Packed Thriller with a Powerful Message...",
    },
    {
      date: "20 September 2023",
      name: "joelnoronha179",
      rating: "10",
      review:
        "Jawan is a story of social awareness about issues currently in our country. It is also a story of a Jawan who gets wronged in his own country then his son does all the things to give him father a Jawan a honor and respect that he deserves. Nice acting by the cast specially hero Shah Rukh Khan and villain Vijay Sethupathi. Nice acting by all the feamle leads, Deepka Padukone, Nayanthara, Sanya Malhotra, Ridhi Dgra. The Family man sereis season 1 most of the cast are in this movie. Vijay Sethupathi and other two female actors. Nice message around election and votes given in thiss flm. This film is about patriotism and will also make you emotional. This film is about romance at the same time it is about family and society issues. Nice movei with good package I would say of all the things I said above. Nice music, songs and dance. Challeya son and dance steps are huge hit. I recommend you to watch the story. You will find different looks of Shah Rukh KHan in the movie. And in all thes looks he has performed really well. I really had a nice time watching this movie. I recommend Jawan movie to you. I rate Jawan movie 10 stars on 10. You would not find a reason to not like thi movie. Last Shah RUkh KHan one looks is there where he smokes too much cigarette. That using too much cigarette could be avoided as this is aa family film, they should have thought that even small children are watching this film. They shouldnt be inspired.",
      title: "No reason to not like the film- Good package film",
    },
    {
      date: "18 September 2023",
      name: "chawndro",
      rating: "9",
      review:
        "Jawan is one of S. R. K. Best; Swades, Chak De India top. SRK's dedication and hardwork at this age is unbeatable. Young actors must learn from SRK how hardwork and dedication come as responsibility and accountability towards fan and audience. Atlee directed well. And the look, attitude and character SRK had as father \"Old Man Logan\" simply amazing. I am a Hugh J fan from Wolverine series. But I wouldn't mind if they ever cast SRK as Old Man Wolverine, no doubt he will do amazing. Female lead actor Nayanthara was great, she fits the character and brings female cop to a serious level. Deepika was ok, her acting in Pathan as lead female spy was a joke, in Jawan she was ok. There were plenty of strong female lead actors who could have brought Aishwarya's character to another world with strength, love, emotion ... watching Aishwarya was more like watching Deepika doing Deepika. That's where the movie gets 9/10. Imo first train hijack scene was so cool and great, next two operations were so so. They could've made next operation bigger than previous. Feels like they focused on the first operation so much, then they started celebrating.",
      title: 'S R K G.O.A.T and that "Old man Logan" wow',
    },
    {
      date: "16 September 2023",
      name: "rajmakoley",
      rating: "9",
      review:
        "'Jawan' is the one of the best movie in 2023. Action, Thriller, Drama, Mystery, Adventure has all in this film. No doubt, 'Jawan' is a constantly Engaging and Entertaining film.Let's have a big round of applause to Director Atlee, for his Mind blowing Direction and also Story. He gives a social message in action relevant. He presents some sequences, which really touch your heart. Anirudh Ravichander gives proper Background Score. G. K. Vishnu's Cinematography is great.The Action of this movie has to be said separately. Some action scenes, do not let the eyelids fall.Talking about performances, Shah Rukh Khan (Vikram Rathore, Azad), Vijay Sethupathi (Kalee), Nayanthara (Narmada) are the Lead Characters in this film.Shah Rukh Khan represents seven looks, that sets it apart from other films. His acting will really impress you once again. His Fitness, Style, and Action really worth watching. Along with SRK, Vijay Sethupathi holds his place properly. He proves himself as a proper Villain in this film. His hindi speaking style is very interesting. Nayanthara portray her character very well.The Supporting Actors, Sanya Malhotra (Dr. Eeram), Priyamani (Lakshmi), Sanjeeta Bhattacharya (Helena), Lehar Khan (Kalki), Girija Oak (Ishkra), Aaliyah Qureishi (Jahnvi), Sunil Grover (Irani) and Others acts very well.In a Cameo Roll, Deepika Padukone (Aishwarya Rathore), and Sanjay Dutt (Madhavan Naik) won our hearts.-Rajma Koley.",
      title: "'Jawan' Is A Constantly Engaging And Entertaining Film.",
    },
    {
      date: "16 September 2023",
      name: "labonytlr",
      rating: "10",
      review:
        "Watched Jawan yesterday. It's the best movie i've ever seen. What you can't expect from King Khan? The movie is just insane on every angle. From first to last, everything is too good, you can't find a single problem or any boring parts in this movie.Spoiler Alert::::\nAlert! Alert!! Alert!!!The story is nothing too new, but the outcome at the end of the movie is just lit \ud83d\ude40\ud83d\ude40\nThere, ShahRukhKhan have double part, one is a father and one is a son, both are soldiers.The Acting, Mannnnn! Insane acting from everyone, SRK, Nayanthara and Vijay Shethupathi also.The Songs are not best, but yeah, They're good.Man, The BGMs are just awesome, I got goosebumps in every Action scenes, Hatsoff to Anirudh to gifting us this legendary background scoring.Atlee just blasted a boom in box office bro\ud83d\udc51\nPathan-10-50, Jawan,100000-10. Sorry for Pathan fans.So yeah, That's my review...",
      title: "The Best movie Till nowwwwwww\ud83d\udc51",
    },
    {
      date: "12 October 2023",
      name: "MuviFan73",
      rating: "9",
      review:
        "Tone, Script & Story: The movie is an action thriller with intense and engaging story. The story is about how the truth of major Vikram is bought in front of the world. The villain is a rich business tycoon who plays by evil terms. One could totally relate with it and thus the viewing experience goes to another level for oneself. Thanks to writers & additionally director to present this masterpiece. The viewing experience was so intense that it bought tears to my eyes on more than one occasion.Direction, Screenplay, Cinematography: I am not that great fan of action but here action along with storyline got me jumping in my seat. The metro, the jail, the partners, the chase, the villain with all its evil was a dish served with essense.Music: Music was average. My favorite track took place in jail when the son was born (Aararaari raaro). It went so well with storyline.Acting: Everybody acted well, but the screen presence and delivery of Father was just another level. SRK looked like a hunk. He aced.Final Verdict: For me it was as if the movie was made particularly for my entertainment. I enjoyed it.",
      title: "Extraordinary entertainment that was personal!",
    },
    {
      date: "5 November 2023",
      name: "Achyut_Prashast_Singh",
      rating: "10",
      review:
        "Jawan is one of the best Bollywood action thrillers in recent times. It oozes the feel of a comic book film from its visuals, action sequences and costumes alone. There's surprise after surprise, and none of it is affected by the simple and at times predictable storyline. In fact, it is impressive how Atlee managed to create a gem of a movie from a rather simple story which even has shades of his 2017 Tamil film Mersal, except Jawan turns it even better with its execution.From the opening sequence itself, you are captivated and what follows is a totally spellbinding plot. While it is intense and thrilling, it is also emotionally powerful in its depiction of the protagonist's flashback; it is strong enough to move you to tears. Even the songs are catchy and placed at the right time. As for the action, it is the best part of the film and one major reason I would love to see it again and again.The editing and VFX are brilliant. Close to three hours, but not a single boring moment. But what truly completes this film is the character work. Every character has something special to contribute, and the performances simply elevate the film's entertainment quotient. SRK as Azad is superb as always, but Vikram Rathore might just be the best action role he has EVER played. From his expressions alone, you can feel, \"Let's not mess with this guy!\" and seeing SRK play such a character was something I never expected. Nayanthara... what an actress! A strongly written character and memorable too. The girl team's actors are also impressive, but it's Deepika Padukone's part which left me teary eyed. I won't forget her character for quite some time. Vijay Sethupathi was fantastic, and a perfect foil for SRK.The film also succeeds in its intentions to showcase women empowerment without being preachy in any way. Kudos to the writers for making every female character stand out as much as the male lead, and not rendering them useless at any point. This movie truly understands what \"heroine\" means and by that logic we have multiple of them here.Lastly, this is a fun film with more surprises as the story continues. The audience in the theatre cheered, whistled, laughed and enjoyed it through and through. I think we need to stop worrying about matching Hollywood and instead focus on our own brand of homegrown action movies. And one last thing... that cameo really caught me off-guard. That was a good one, Atlee.",
      title: "A perfect masala entertainer. No complaints from me.",
    },
    {
      date: "4 December 2023",
      name: "banzoozalreviews",
      rating: "8",
      review:
        '"Jawan" is the ultimate Shahrukh Khan film that showcases his star power like no other, while the film entertains you endlessly. A complete, relentless masala crowd-pleaser through and through. Shahrukh Khan roars, roars, and roars-I loved every beautiful, mad 169 minutes of it. If "Pathaan" was the appetizer, "Jawan" is breakfast, lunch, dinner, and some delicious leftovers combined. This is the kind of cinema I have started appreciating more and more these days-great escapist, over-the-top masala entertainment that takes all the worries away, even if it\'s just for a few hours. But even in this genre, "Jawan" was next level and something truly special. A mad film!',
      title: "A Mad film that again showcases what a star SRK is!",
    },
    {
      date: "23 September 2023",
      name: "ClassicCinemaKid",
      rating: "10",
      review:
        "\"Jawan\" is an absolute cinematic triumph that showcases the brilliance of Bollywood. Shah Rukh Khan's performance is a tour de force, capturing the essence of his character with a depth and intensity that only he can deliver.Atlee's direction is a revelation, seamlessly blending high-octane action with a heartwarming storyline. The action sequences are nothing short of breathtaking, leaving audiences on the edge of their seats. The VFX work is flawless, making every action scene feel larger than life.The movie's storyline is a rollercoaster of emotions, brilliantly written to keep the audience engaged from start to finish. It not only entertains but also delivers a powerful message that resonates with viewers long after the credits roll.Anirudh's background music is a character in itself, enhancing every scene and tugging at the heartstrings. His compositions are both soul-stirring and invigorating, setting the perfect tone for the film.\"Jawan\" is more than just a movie; it's a cinematic masterpiece that leaves a lasting impact. It's a testament to the power of storytelling and the magic of cinema. This film is a must-watch, and it deserves all the accolades it receives. Bravo to the entire team for creating this extraordinary piece of art.",
      title: "Cinematic Triumph",
    },
    {
      date: "21 September 2023",
      name: "rafayrasheed030",
      rating: "10",
      review:
        'Recently, I got a chance to watch "Jawan" and I have to say, it had a profound effect on me. The film beautifully captures the bravery, sacrifice and unwavering dedication of our brave soldiers.The storytelling in "Jawan" is no exception. The plot is not only a roller coaster action, but delves into the emotional struggles and personal sacrifices our soldiers make to protect our country. Character development is top notch, allowing us to connect with the main characters on a personal level.The performances in "Jawan" are outstanding. The leading actors deliver a powerful performance that showcases the grit and determination of our soldiers with impeccable determination. Their on-screen friendship feels authentic and adds emotional depth to the story.What makes "Jawan" stand out is that it is a realistic portrait of what our soldiers face. The action sequences are strong and the attention to detail is commendable. The cinematography and direction keep you engaged throughout the film, ensuring that every moment is both visually stunning and emotionally rich.The film beautifully highlights the importance of patriotism and the sacrifices our soldiers make to protect our freedom. It is a moving tribute to our unsung heroes, an invitation to all of us to remember their incredible sacrifices and reflect on the opportunities we enjoy because of their sacrifices.Conclusion "Jawan" is a must watch for every Indian. It is a passionate, emotional and powerful tribute to our soldiers who risked their lives for our safety. I left the theater with respect and gratitude for our troops. Don\'t miss this cinematic gem of a spee-fest.',
      title: "Title: A powerful and entertaining tribute to our unsung heroes!",
    },
    {
      date: "25 September 2023",
      name: "Vashista-Bhat",
      rating: "9",
      review:
        "\"Jawan\" is by far the Greatest Film in Shah Rukh Khan's career. The film's plot revolves around a man who is driven by a personal vendetta to rectify the wrongs in a society, while keeping a promise which was made years ago. He comes up against a monstrous outlaw who has no fear, and has caused extreme suffering to many.Shah Rukh Khan's performance as Vikram Rathore and Azad is worth a mention, while Nayanthara has also given a good performance. She wasn't sidelined, and audience can see the Lady Superstar.The Script is good, and the Screenplay is somewhat like that of a Tamil Cinema rather than Hindi. Engaging Screenplay, and brisk narration pace will keep the audience involved. Although the Screenplay is engaging, there are some sequences that goes beyond any logic. But in the context of movies, it can be forgiven.The music, composed by Anirudh Ravichander is not as good as the ones he composed in his Tamil Films like Vikram. This is the only true minus point of this Film. \"Jawan\" is a thorough entertainer that should not be missed.My Rating: 9/10\nVerdict: Outstanding.",
      title: "Jawan: Shah Rukh Khan's Triumph in a Riveting Action Drama",
    },
    {
      date: "30 November 2023",
      name: "cableanna",
      rating: "10",
      review:
        "SRK makes sure to leave a mark as an actor even in a mass movie like Jawan. Bald cap, salt and pepper beard aren't enough to not be identified. His raspy old man voice actually completes the disguise. The voice is better and more effective than Christian Bale's Batman voice in the Dark Knight trilogy, in my opinion. I would like to defend that vigillante motif. I don't think that the movie abandons it or nearly forgets about it. I see actually see it as a clever twist on vigilante / social justice films like those made by Shankar. In those older movies, vigilantism, violence and god-like hero figure is needed to fix the society. Jawan starts exactly like that and makes people feel satisfied that corrupt politicians are punished and justice is served but at the end it almost breaks the fourth wall and conveys a message that goes like \"hey folks, don't forget this is just a movie and we don't really need a hero like this because we have already enough power as a citizens of a democratic country\". Also, unlike clearly leftist Shankar's movies, Jawan focuses solely on issues that have no right-wing or left-wing angles. And all of them are actually based on real events that happened (or even keep happening) in India. Therefore, the politics of the movie is not partisan but it's also not vague and shy to address real issues. So, I think the vigilante motif is actually well-thought. At first, we think that SRK's character is a baddie, then we are happy to see he's a good vigillante fighting injustices in Indian society and finally, we are made to realize that we (or Indians) as citizens should be the ones fixing all those problems by voting carefully.Part of traditional tamil medicine or siddha vaidhiam, the use of checking the pulse is a form of diagnosis technique. If you watch older tamil films, specially based on life in villages and smaller towns, you can see this reference to this shown quite a lot. Technically when someone is pregnant, the pulse rate will change compared to when you are not, and someone trained in using the technique was able to detect the variation that signified that someone was pregnant. Maybe its scientifically not proven still that a doctor can predict if a woman is pregnant with her pulse, but a pregnant lady's pulse works much faster than a normal woman, the heart rate rises rapidly in order to keep her growing child healthy, most of the ancient Indian/Chinese traditions used this technique before.Also, I really liked the Tamil dub for Azad especially in the whole metro sequence. He matched all of SRK's delivery, grunts and expressions exactly!",
      title:
        "Maasi Maasi Maasi Maasi - Blockbuster Cinema That Is Worth Every Penny",
    },
    {
      date: "4 October 2023",
      name: "eveq-21924",
      rating: "10",
      review:
        "No one can role this role better than srk.if srk is not this movie I can't imagine it it's a really awesome movie with nest direction I love I shout in movie and thr entry of srk wooooo just wow Depika role is so Impactful and nayantara just awesomeNo one can role this role better than srk.if srk is not this movie I can't imagine it it's a really awesome movie with nest direction I love I shout in movie and thr entry of srk wooooo just wow Depika role is so Impactful and nayantara just awesomeNo one can role this role better than srk.if srk is not this movie I can't imagine it it's a really awesome movie with nest direction I love I shout in movie and thr entry of srk wooooo just wow Depika role is so Impactful and nayantara just awesome.",
      title:
        "Trying to do something unique and they done it newly fresh action scene",
    },
    {
      date: "8 September 2023",
      name: "joyalbrightt",
      rating: "9",
      review:
        "Jawan is not at all fresh,perfet story rooted with realsitical approach ,it just CLEAN MASS Masala FILM Signatured BY Atlee FILM MAKING ,tat is enough\nfor the Fans of this Genre to be rejoiceful at theaters !Casting is Proficient ! Ladies of jawan are treat to watch !!Vijaysethupathi is solid ;#deepikapadukone showed her class and #nayanthara is impressive !Outstanding cinematography and Captivating action set pieces with great finesse !Anirudh does what anirudh does these days ;elevating the big screen with his exceptional BGM works !AND THE KING shahrukhkhan HIMSELF ; his Double Impacting Showcase is Immaculate in jawan ;his Charm ,his Swag ,his Presence, his Dance ;\nEverything he does Entertains his Fans like Me , the celebration started once again ....!!!BOX office is going to be Thrashed for sure , how brutal it will be lets wait and see ...!!!",
      title: "KING SIZE BLOCKBUSTER",
    },
    {
      date: "7 September 2023",
      name: "skmenon1993",
      rating: "8",
      review:
        '***Jawan Hindi Movie Review***Starring Shah Rukh Khan in lead role directed by Atlee.Also starring Vijay Sethupathi Nayanthara, Sanya Malhotra Priya Mani Sunil Grover*** Culmination of Many Films into One***Disclaimer :If u have watched Thala Ajith Movie " Aarambham" , Vijay - Atlee Movies, Vijay movie " Katthi" , The Movies where the Hero points out the evil side of the political system, JAWAN will be a waste..But if you want to watch Jawan from the entertainment angle wherein you wanna a theatrical experience, watch SRK swag, his kick-ass action, massy elements, go for Jawan.Positivity of Jawan.1) After Pathaan, Shahrukh Khan again on a full mood action. Double role , wherein the Dad character was awesome. A never seen before avatar of SRK. SRK swag, his action proves that age is just a number for him. Atlee had fully extracted from SRK thereby using his stardom to make the people believe that Jawan is what SRK needs to do to bring the audience back, blow whistles and make box office houseful.2) Vijay Sethupathi\'s villanism doesn\'t disappoint but his accent seems to break the mood.3) Action sequences was whistle blowing. The climax action sequence especially for me had just accelerated ny mood.5) After Jailer, another terrific BGM delivery from AnirudhNegativity1) Familar Storyline. As i mentioned the film names in the disclaimer, Atlee able to edit different story lines of various hits adding the commercial elements flavour thereby making a watchable flick.2) Over Exposure of Nayanthara. Could have got better choice when selecting a heroine in a mass masala movie. Nayanthara in this proves to be a miscast.3) Except the song " Banda Zinda Hu" rest were below average.Overall a mass masala entertainer package movie.',
      title:
        "A culmination of various Tamil Hit Movies Blended with SRK Stardom",
    },
    {
      date: "9 October 2023",
      name: "balochistan",
      rating: "10",
      review:
        'I was expecting to be entertained by this film as I know every work of SRK is a well done job. From storyline to pro acting of the cast to eye catching choreography to action, all done professionally and well. I have always loved and will love films produced and or acted by the legendary actor Shahrukh Khan. He knows his audience and respects their expectations in delivering a good film to them. I am sure he has many other upcoming great films under his sleeves to come! I am not just a big fan of him but a dedicated admirer and I look at him as my role model. From his humble start in Indian film industry to being one of the top actors in the world. My best wishes to him. I highly recommend "Jawan" to all who haven\'t watched it yet.',
      title: "An immpressive film, highly recommended",
    },
    {
      date: "19 September 2023",
      name: "hidaytrahman",
      rating: "10",
      review:
        'This film is 100% enjoyable, displaying SRK and Atlee\'s next-level work, as well as outstanding performances by Vijay Sethupathi and the whole ensemble.""Jawan" is without a doubt one of the greatest films of the year! Not when you just want to be silent! Shah Rukh Khan demonstrates yet again why he is the KING!Story: Keeps you interested throughout,\nThe entire theatre went insane. Despite being an action thriller, the film has a strong emotional core. It\'s unusual for a masala Indian film to write well-developed female characters.Finally, "Jawan" is a must-see for action movie fans. You\'ll want to see more of this flick.',
      title: "Story action and acting",
    },
    {
      date: "10 September 2023",
      name: "asadkhan0810",
      rating: "9",
      review:
        '"Jawan" starring the iconic actor Shahrukh Khan is nothing short of a cinematic masterpiece. This film seamlessly blends action, social relevance, and a fast-paced narrative to create a near-perfect product. In a time when political atmospheres are tense, "Jawan" fearlessly delivers a crucial message to its viewers.The movie\'s action sequences are a treat for adrenaline junkies, leaving the audience craving for more with every thrilling moment. Shahrukh Khan and the entire cast deliver a stellar performance, immersing us into the story.The music in "Jawan" is a standout feature, with the musician crafting a memorable soundtrack that enhances every scene. The background music adds depth and excitement to the overall experience."Jawan" is a must-watch for all moviegoers, and if you\'re a Shahrukh Khan fan, it undoubtedly warrants a second viewing in theaters. This film not only entertains but also enlightens, making it a truly impactful cinematic gem.',
      title: "Fantastic",
    },
  ]);
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
