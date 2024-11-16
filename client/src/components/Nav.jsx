import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useEffect } from "react";


function Nav({ user, setUser }) {
  const navigate = useNavigate();

   const logout = async () => {
    const response = await axiosInstance.delete("/auth/logout");
    console.log(response);
    
    if (response.status === 204) {
      setUser(null);
      navigate("/");
      return
    }
  }

  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/"} className="nav-link active mx-5" aria-current="page">
            <h1>GoodNews</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!user?.email && (
                <li className="nav-item">
                <Link
                  to={"/registration"}
                  className="nav-link active mx-2"
                  aria-current="page"
                >
                  <h3>Регистрация</h3>
                </Link>
              </li>
              )}
              {!user?.email && (
                <li className="nav-item">
                <Link
                  to={"/authorization"}
                  className="nav-link active"
                  aria-current="page"
                >
                  
                  <h3>Авторизация</h3>
                </Link>
              </li>
              )}
              {user?.email && (
                <li className="nav-item mx-5">
                <Link
                  to={"/posts"}
                  className="nav-link active"
                  aria-current="page"
                >
                  <h3>Новости</h3>
                </Link>
              </li>
              )}
            </ul>
            {user && (
              <>
                <li className="nav mx-5">Привет , {user?.email}</li>
                <button className="nav-item btn btn-danger mx-5" onClick={logout}>
                  Выйти
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
