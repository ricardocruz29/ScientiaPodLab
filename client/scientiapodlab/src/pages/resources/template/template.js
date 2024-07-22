import useAuthRedirect from "../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../hooks/useChangeActiveSidebar";

function Template() {
  useAuthRedirect();
  useChangeActiveSidebar("resources");

  return <h1>Template</h1>;
}

export default Template;
