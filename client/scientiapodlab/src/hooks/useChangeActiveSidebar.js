import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeActiveSidebar } from "../redux/features/global/globalSlice"; // Adjust the path as necessary

const useChangeActiveSidebar = (newActiveSidebar) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (newActiveSidebar) {
      dispatch(changeActiveSidebar(newActiveSidebar));
    }
  }, [newActiveSidebar, dispatch]);
};

export default useChangeActiveSidebar;
