import { Outlet } from "react-router";
import SideBar from "../Pages/SideBar";

export default function Layout() {
  return(
    <section>
      <SideBar/>
      <main>
        <Outlet/>
      </main>
    </section>
  )
}