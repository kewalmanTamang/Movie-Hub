import { useState, useEffect,useContext } from 'react'
import Card from "../Components/Card";
import {Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';

function Home() {

const [toast, setToast] = useState("");

const [movies, setMovies] =useState([]);
const [loading, setLoading] =useState(true); 
const [error, setError] = useState(""); 
const [page, setPage] =useState(1);

const [query,setQuery] = useState("");
const [search,SetSearch] = useState('');
const [sortBy, setSortBy] = useState("Popularity");
const [genre, setGenre] =useState("All");

const {theme, toggleTheme} = useContext(ThemeContext);

const favoriteIds = useSelector(
  (state) => state.favorites.ids
)


const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
  10752: "War",
  37: "Western",
}

useEffect(()=>{
 const fetchMovies = async () =>{
 const API_TOKEN = import.meta.env.VITE_API_TOKEN;
setError("");
setLoading(true);
  let url="";
  if(query ===""){
    url =`https://api.themoviedb.org/3/movie/popular?page=${page}`;
  } else{
    url=`https://api.themoviedb.org/3/search/movie?query=${query}`;
  }
  try{
  const response = await fetch(url, {
    headers:{
      Authorization:API_TOKEN,
    },
  });

 if(!response.ok){
  throw new Error("Failed to fetch movies");
 }
  const data = await response.json();
  setMovies(data.results); 

  }  catch(error){
  setError("Failed to Fetch Movies"); 
  } finally{
    setLoading(false);
  }
 };
 fetchMovies();
},[query,page]);

const filteredMovies = movies.filter((movie) =>{
 return( 
    movie.title.toLowerCase().includes(search.toLocaleLowerCase())
  )})

  const genreFilteredMovies = filteredMovies.filter((movie) =>{
  if(genre === "All"){
    return true;
  } return movie.genre_ids.some((id) => genreMap[id] === genre);
})
  const sortedMovies =[...genreFilteredMovies];
  if(sortBy === "Rating"){
    sortedMovies.sort((a,b) =>b.vote_average - a.vote_average);
  }
  if(sortBy ==="Year"){
    sortedMovies.sort((a,b)=> new Date(b.release_date) -new Date(a.release_date));
  }
if(sortBy==="Title"){
  sortedMovies.sort((a,b)=> a.title.localeCompare(b.title))
} 
if(loading){
  return(
    <div className='min-h-screen flex justify-center items-center'>
      <h1 className='text-3xl text-oragne-500 font-bold'> 🎬 Loading Movies </h1>
    </div>
  );
}
if(error){
  return(
    <div className='min-h-screen flex justify-center items-center'>
      <h1 className='text-red-500 text-3xl font-bold'>{error}
      </h1>
    </div>
  )
}
return (
    <>
    <div className= {`min-h-screen flex flex-col justify-start items-center pt-10 gap-4 transition-colors duration-300
      ${
        theme === "dark"
        ? "bg-zinc-950 text-white"
        :"bg-white text-black"
      }
      `}>

      <h1 className='font-bold text-orange-600 text-4xl '>MOVIE HUB</h1>
      <h2 className='text-xl italic '>Search your favourite movie instantly</h2>
      <form onSubmit={(e)=>{
        e.preventDefault()
      }}   className='flex flex-col sm:flex-row gap-4'>
        <input className=' 
        w-96 bg-zinc-800 placeholder-zinc-700 rounded-xl px-4 py-3 text-white outline-none border border-zinc-500 focus:border-orange-500
        transition' 
        type='text'
        placeholder='Search for a movie.....'
        value={search}
        onChange={(e)=>{
         SetSearch(e.target.value);
        }}
        />
      
        <button onClick={()=> setQuery(search)} className='bg-orange-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-amber-600 active:scale-95 transition-all duration-150 cursor-pointer text-lg'>🔍 Search</button>
         <Link to="/favorites"
        className='bg-orange-500 text-black text-center font-semibold px-6 py-3 rounded-xl hover:bg-amber-600 active:scale-95 transition-all duration-150 cursor-pointer text-lg'>
          ❤️ Favorites
        </Link>
        <button onClick={toggleTheme}
  className="bg-orange-500 text-white px-4 py-2 rounded-lg">
  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </form>

      <div className='flex flex-col sm:flex-row gap-4 '>        
    <div className='flex flex-col gap-2'> 
     <label className="text-zinc-400 text-sm font-medium">Sort by:</label>
     <select 
     value={sortBy}
     onChange={(e)=>{
      setSortBy(e.target.value)
     }}
     className='bg-zinc-800 text-white border border-zinc-700 rounded-xl px-2 py-2 outline-none focus:border-orange-500 transition'>
      <option value="Popularity"> Popularity </option>
      <option value="Rating"> Rating </option>
      <option value="Year"> Year </option>
      <option value="Title">Title</option>
     </select>
        </div> 
<div className='flex flex-col gap-2'> 
  <label className="text-zinc-400 text-sm font-medium">Genre:</label>
     <select 
     value={genre}
     onChange={(e) =>{
      setGenre(e.target.value);
     }}
     className='bg-zinc-800 text-white border border-zinc-700 rounded-xl px-2 py-2 outline-none focus:border-orange-500 transition'>
      <option value="All">All Genres</option>
      <option value="Action"> Action </option>
      <option value="Comedy"> Comedy </option>
      <option value="Drama"> Drama </option>
      <option value="Fantasy"> Fantasy </option>
      <option value="Horror"> Horror </option>
      <option value="Romance"> Romance </option>
      <option value="Sci-Fi">Sci-Fi </option>
     </select>   
       </div>
      </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 mb-10'>


{sortedMovies?.length > 0 ? (
sortedMovies.map((movie)=>(

  <Link to ={`/movie/${movie.id}`} key={movie.id}> 
 <Card
  genre={movie.genre_ids.map((id) => genreMap[id]).filter(Boolean).slice(0,2).join(", ")}
 key={movie.id}
 title={movie.title}
 description={movie.overview}
 rating={movie.vote_average.toFixed(1)}
 year={movie.release_date.split("-")[0]}
 poster={
  movie.poster_path
  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  : "https://placehold.co/500x750?text=No+Image"
 }
 isFavorite ={favoriteIds.includes(movie.id)}
 movieId={movie.id}
 />
</Link>

))
):(
 <div className='col-span-full flex justify-center'>
  <p className='text-2xl font-semibold text-zinc-500'>🎬 Movie Not Found </p>
 </div>
)}</div>
<div className='flex justify-center items-center gap-4 mb-10'>
  <button className='bg-orange-500 text-white px-5 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
  onClick={() =>setPage(page -1)}
  disabled={page === 1}
  >
    ← Previous
  </button>
  <span className='text-xl font-bold'>
   Page {page}
  </span>
  <button onClick={()=> setPage(page + 1)}
    className='bg-orange-500 text-white px-5 py-2 rounded-xl cursor-pointer'
    >
 Next  →
  </button>
</div>

 </div>{toast &&(
  <div className='fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce'>{toast}</div>
 )
 }
    </>
  )
}
export default Home
