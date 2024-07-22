import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";

function Resources() {
  useAuthRedirect();
  useChangeActiveSidebar("resources");

  return <h1>Resources</h1>;
}

export default Resources;
