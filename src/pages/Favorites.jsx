import {useState, useEffect, useContext} from "react"; 
import Card from "../Components/Card";
import {Link} from "react-router-dom"; 
import { ThemeContext } from "../context/ThemeContext";


function Favorites(){
 
  const [favoriteMovies, setFavoritesMovies] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const {theme } = useContext(ThemeContext);
  
  const API_TOKEN = import.meta.env.VITE_API_TOKEN;

  useEffect(()=>{

   const fetchFavoriteMovies = async() =>{
     const favoriteIds = 
    JSON.parse(localStorage.getItem("favorites")) || [];

    const movies = await Promise.all(
      favoriteIds.map(async (id)=>{
        const url =`https://api.themoviedb.org/3/movie/${id}`;
        const response = await fetch(url, {
          headers:{
            Authorization: API_TOKEN, 
          },
        });
        const data = await response.json();
         return data; 
      })
    ) 
    setFavoritesMovies(movies);
    setLoading(false);
   }
 fetchFavoriteMovies();
  },[])



if(loading){
  return(
      <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold text-orange-500">
        Loading Favorites...
      </h1>
    </div>
  )
}
if(favoriteMovies.length === 0){
    return(
      <div
  className={`min-h-screen flex justify-center items-center transition-colors duration-300 ${
    theme === "dark"
      ? "bg-zinc-950 text-white"
      : "bg-white text-black"
  }`}
>
      <h1 className="text-3xl font-bold text-orange-500">
        No Favorites Movies...
      </h1>
    </div>
  )
}

  return (
 <div
  className={`min-h-screen p-8 transition-colors duration-300 ${
    theme === "dark"
      ? "bg-zinc-950 text-white"
      : "bg-white text-black"
  }`}
>
    <h1 className="text-4xl font-bold text-orange-500 text-center mb-8">
      ❤️ Favorite Movies
    </h1>

    <div className="flex flex-wrap gap-6 justify-center"> 
{favoriteMovies.map((movie) =>{
return(
<Card
key={movie.id}
movieId={movie.id}
title={movie.title}
description={movie.overview}
rating ={movie.vote_average.toFixed(1)}
year={movie.release_date.split("-")[0]}
genre={movie.genres.map((genre) => genre.name).join(", ")}
poster={
  movie.poster_path
  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  : "https://placehold.co/500x750?text=No+Image"
 }
/>)})}
    </div>
  </div>
);
}
export default Favorites;