import useAuthRedirect from "../../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../../hooks/useChangeActiveSidebar";

function Episode() {
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  return <h1>Episode</h1>;
}

export default Episode;
