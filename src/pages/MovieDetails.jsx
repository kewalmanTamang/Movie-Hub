import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


function renderStarts(rating){
 const stars= Math.round(rating/2); 
 return "⭐".repeat(stars) + "☆".repeat(5 - stars); 
}
function MovieDetails(){

  const {id} = useParams(); 
  const navigate = useNavigate(); 

  const[movie, setMovie] = useState(null); 
  const[loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const [trailKey, setTrailerKey] = useState(""); 
  const [cast, setCast]= useState([]);

  const {theme}= useContext(ThemeContext);
  
  useEffect(()=>{
   const fetchMovie = async() =>{
     setLoading(true); 
     setError("");

     const url = `https://api.themoviedb.org/3/movie/${id}`;
     const API_TOKEN = import.meta.env.VITE_API_TOKEN;

    try{
      const response = await fetch(url, {
        headers:{
          Authorization:API_TOKEN,
        },
      })


      if(!response.ok){
        throw new Error("Failed to fetch Movie")
      }
      const data = await response.json(); 
      setMovie(data);
      
      const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          headers:{
            Authorization:API_TOKEN,
          },
        }
      ) 
      const trailerData = await trailerResponse.json();
      const trailer = trailerData.results.find(
        (video) =>
          video.site === "YouTube" && 
        video.type ==="Trailer"
      )
      if(trailer){
          setTrailerKey(trailer.key)
        }
      const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers:{
          Authorization: API_TOKEN,
        },
      });
  const creditsData = await creditsResponse.json();

  
setCast(creditsData.cast.slice(0,10));
    }  
    catch(error){
   setError("Failed to fetch the data")
    }
    finally{
   setLoading(false); 
    }
   } 
   fetchMovie(); 
  },[id])

  if(loading){
    return(
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-orange-500">🎬 Loading Movie...</h1>
      </div>
    )
  }
  if(error){
    return(
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-red-500 text-3xl font-bold">
          {error}
        </h1>
      </div>
    )
  }
  return(
<div
  className={`min-h-screen px-5 py-8 lg:px-12 transition-colors duration-300 ${
    theme === "dark"
      ? "bg-zinc-950 text-white"
      : "bg-white text-black"
  }`}
>
  <div className="flex flex-col lg:flex-row gap-8">
      <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="w-full max-w-xs lg:w-80 mx-auto rounded-xl"
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl lg:text-5xl font-bold text-orange-500">
          {movie.title}
        </h1>
        <h2 className="text-2xl font-semibold mb-1"> Overview</h2>
        <p className="text-zinc-600 text-base lg:text-lg"> {movie.overview}</p>
        
       <p>{renderStarts(movie.vote_average)} {movie.vote_average.toFixed(1)}</p>
        <p>⏱ <span className="font-semibold">Runtime:</span> {movie.runtime} min</p>
        <p>🌍 <span className="font-semibold">Language:</span> {movie.spoken_languages.map((language)=> language.english_name)
          .join(", ")}</p>
        <p>📅 <span className="font-semibold">Year:</span> {movie.release_date.split("-")[0]}</p>
        <p className="text-semibold">
          🎭<span className="font-semibold">Genres:</span>  {movie.genres.map((genre) => genre.name).join(", ")}
        </p>

          {trailKey && (
  <button
    onClick={() =>
      window.open(
        `https://www.youtube.com/watch?v=${trailKey}`,
        "_blank"
      )
    }
    className="flex items-center w-full justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg cursor-pointer hover:shadow-red-500/40 hover:scale-101 transition-all duration-300 w-fit"
  >
    ▶ Watch Trailer
  </button>
)}
   <button 
      onClick={() => navigate("/")}
      className="mb-8 w-full bg-orange-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:shadow-red-500/40 hover:scale-101 transition-all duration-300 w-fit cursor-pointer"
      > ← Back
   </button>
    
      </div>
      </div>
         <div className="mt-10">
  <h2 className="text-4xl font-bold text-orange-500 mb-5">
    🎭 Cast
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
    {cast.map((actor) => (
      <div
        key={actor.id}
        className="bg-zinc-900 rounded-xl p-3 shadow-lg text-center"
      >
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
              : "https://placehold.co/185x278?text=No+Photo"
          }
          alt={actor.name}
          className="w-full h-56 object-cover rounded-lg"
        />

        <h3 className="mt-3 text-white font-semibold">
          {actor.name}
        </h3>

        <p className="text-zinc-400 text-sm">
          {actor.character}
        </p>
      </div>
    ))}
  </div>
</div>
    </div>
  ); 
}

export default MovieDetails;