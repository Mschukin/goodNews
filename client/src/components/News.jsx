import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import NewsCard from "./newsCard";


export default function News() {
    const[news,setNews] = useState([])
useEffect(()=>{posts},[])

async function posts() {
    const {data} = await axiosInstance.get('/posts')
    setNews(data)
console.log(data);

}

return (
    <>
    {news.map((news)=>(<NewsCard key = {news.id} news = {news} setNews={setNews}/>) )}
    </>
  );

}