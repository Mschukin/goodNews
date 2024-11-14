import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";



import axiosInstance, { setAccessToken } from "./axiosInstance";
import Reg from "./components/Reg";
import Auth from "./components/Auth";
import News from "./components/News";


export default function App() {
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    // при монтирование (загрузка страницы)
    axiosInstance.get("/auth/refresh").then(({ data }) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
    });
  }, []);

  console.log("Наш пользователь", user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} setUser={setUser} />,
      children: [

        {
          path: "/registration",
          element: <Reg />,
        },
        {
          path: "/authorization",
          element: <Auth setUser={setUser} />,
        },
        {
          path: "/news",
          element: <News user={user} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}