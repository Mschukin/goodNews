import { Link } from "react-router-dom";

function Nav() {
    return (
        <div>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link to={'/'} className="nav-link active mx-2" aria-current="page" ><h1>GoodNews</h1></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link to={'/registration'} className="nav-link active" aria-current="page" ><h3>Регистрация</h3></Link>
        </li>
        <li className="nav-item">

        </li>
      </ul>
      {/* {user?.email&&( */}
        {/* <> */}
         {/* <li className="nav-item mx-5">Привет, {user?.email} </li> */}
         {/* <button onClick={logout} className="btn btn-primary mx-2">Выйти</button> */}
        {/* </>)} */}
    </div>
  </div>
</nav>
        </div>
    );
}

export default Nav;