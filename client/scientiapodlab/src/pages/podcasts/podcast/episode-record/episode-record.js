import useAuthRedirect from "../../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../../hooks/useChangeActiveSidebar";

function EpisodeRecord() {
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  return <h1>Episode Record</h1>;
}

export default EpisodeRecord;
