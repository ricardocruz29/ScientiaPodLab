import useAuthRedirect from "../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../hooks/useChangeActiveSidebar";

function Podcast() {
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  return <h1>Podcast</h1>;
}

export default Podcast;
