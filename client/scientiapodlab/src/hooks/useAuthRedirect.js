import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/user/userSlice";
import { useLazyGetUserQuery } from "../redux/api/services/userService";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.information);
  const [triggerGetUser] = useLazyGetUserQuery();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (userInfo === undefined) {
        try {
          const user = await triggerGetUser().unwrap();
          dispatch(setUser({ info: user }));
        } catch (error) {
          console.error("User is not authenticated:", error);
          navigate("/login");
        }
      }
    };

    checkAuthStatus();
  }, [userInfo, dispatch, triggerGetUser, navigate]);
};

export default useAuthRedirect;
