import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";

function FAQs() {
  useAuthRedirect();
  useChangeActiveSidebar("faqs");

  return <h1>Faqs</h1>;
}

export default FAQs;
