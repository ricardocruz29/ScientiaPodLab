import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <div id="layout" class="sidebar">
        <div>Layout - Menu/sidebar and Navbar</div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};
