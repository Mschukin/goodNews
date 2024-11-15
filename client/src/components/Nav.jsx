import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function Nav({ user, setUser }) {
  const navigate = useNavigate();

  async function logout() {
    const response = await axiosInstance.delete("/auth/logout");

    if (response.status === 200) {
      setUser({});
      navigate("/");
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/"} className="nav-link active mx-2" aria-current="page">
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
              <li className="nav-item">
                <Link
                  to={"/registration"}
                  className="nav-link active"
                  aria-current="page"
                >
                  <h3>Регистрация</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/authorization"}
                  className="nav-link active"
                  aria-current="page"
                >
                  <h3>Авторизация</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/news"}
                  className="nav-link active"
                  aria-current="page"
                >
                  <h3>Новости</h3>
                </Link>
              </li>
            </ul>
            {user?.email && (
              <>
                <li className="nav-item">Привет , {user?.email}</li>
                <button className="nav-item btn btn-danger" onClick={logout}>
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
