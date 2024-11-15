import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";

import axiosInstance, { setAccessToken } from "./axiosInstance";
import Registration from "./components/AuthReg/Registration";
import Authorization from "./components/AuthReg/Authorization";
import Posts from "./components/Posts";

export default function App() {
  const [user, setUser] = useState(null);
  // console.log(user);

  const checkUserStatus = async () => {
    try {
      const response = await axiosInstance.get("/auth/refresh")
      if (response.status === 200) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      }
    } catch ({response}) {
      return response.data.message
    }
  }

  useEffect(() => {
    // при монтирование (загрузка страницы)
    checkUserStatus()
  }, []);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={ user } setUser={ setUser } />,
      children: [
        {
          path: "/registration",
          element: <Registration setUser={setUser} />,
        },
        {
          path: "/authorization",
          element: <Authorization setUser={ setUser } />,
        },
        {
          path: "/posts",
          element: <Posts user={user} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}