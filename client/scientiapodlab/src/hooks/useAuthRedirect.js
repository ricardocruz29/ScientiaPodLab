import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/user/userSlice";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.information);

  useEffect(() => {
    if (userInfo === undefined) {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser({ info: parsedUser }));
      } else {
        navigate("/login");
      }
    }
  }, [userInfo, dispatch, navigate]);
};

export default useAuthRedirect;
