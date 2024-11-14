import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Auth from "./Auth";

function Layout({user,setUser}) {


  return (
    <>
      <Nav user={user} setUser={setUser} />
      <section>
        <Outlet/>
      </section>
    </>
  )
}

export default Layout;