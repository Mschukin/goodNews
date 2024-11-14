import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";


function News() {
    const[news,setNews] = useState([])
useEffect(()=>{posts},[])

async function posts() {
    const {data} = await axiosInstance('/posts')
console.log(data);

}



    return (
        <div>
            news
        </div>
    );
}

export default News;