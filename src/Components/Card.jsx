import { useDispatch } from "react-redux";
import { addFavorite,removeFavorite } from "../features/favoriteSlice";

function renderStarts(rating){
 const stars= Math.round(rating/2); 
 return "⭐".repeat(stars) + "☆".repeat(5 - stars); 
}

function Card({title,description,rating,year,runtime,genre,poster,isFavorite,movieId}){

const dispatch = useDispatch(); 

  return(
  <div className="w-80 flex flex-col h-[620px] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:scale-101 hover:border-orange-500 transition-all duration-75 shadow-lg ">

<img src={poster} alt="Movie Poster" className="w-full h-80 object-cover"/>
<div className="p-4 flex flex-col flex-1">
<div className="flex justify-between items-center"> 
 <h1 className="text-2xl font-bold text-orange-500 ">
  {title}
  </h1>
  { 
    <button
  onClick={(e)=> {
 e.preventDefault();
    if(isFavorite){
      dispatch(removeFavorite(movieId))
    } else{
      dispatch(addFavorite(movieId));
    }
  }
  }
  className="text-2xl cursor-pointer hover:scale-110 transition">
    {isFavorite ? "❤️":"🤍"}
  </button>
  
  }
</div>
<div className="mt-3"> 
   <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3  ">{description}</p>
</div>
 <div className="mt-auto flex flex-col gap-3 ">
   <div className="border-t border-zinc-500"></div>
  <div className="flex">
    <span className= "w-70 text-zinc-500 ">{renderStarts(rating)}</span>
    <span className="text-zinc-500">{rating}</span>
  </div>
  <div className="flex">
    <span className="text-zinc-500 w-full"> 📅 Year:</span>
    <span className="text-zinc-500 ">{year}</span>
  </div>
  <div className="flex">
    <span className="text-zinc-500 w-24">🎭 Genre:</span>
    <span className="text-zinc-500">{genre}</span>
  </div>
  </div>
  </div>
</div>
  );
}

export default Card; 