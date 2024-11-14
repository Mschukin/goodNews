import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";

import axiosInstance, { setAccessToken } from "./axiosInstance";
import Registration from "./components/AuthReg/Registration";
import Authorization from "./components/Auth";
import News from "./components/News";

export default function App() {
  const [user, setUser] = useState({});
  console.log(user);

  const checkUserStatus = async () => {
    try {
      const responce = axiosInstance.get("/auth/refresh")
      if (responce.status === 200) {
        setUser(responce.data.user);
        setAccessToken(responce.data.accessToken);
      }
    } catch ({responce}) {
      return responce.data.message
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
          path: "/news",
          element: <News user={user} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}