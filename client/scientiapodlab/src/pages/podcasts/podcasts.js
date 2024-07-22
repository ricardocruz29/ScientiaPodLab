import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";

function Podcasts() {
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  return <h1>Podcasts</h1>;
}

export default Podcasts;
