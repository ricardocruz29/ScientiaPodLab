import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetUserQuery,
} from "../redux/api/services/userService";
import { setUser } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [triggerGetUser] = useLazyGetUserQuery();
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const authenticate = async (credentials, isLogin = true) => {
    try {
      if (isLogin) {
        await login(credentials).unwrap();
      } else {
        await register(credentials).unwrap();
      }

      const user = await triggerGetUser().unwrap();
      dispatch(setUser({ info: user }));

      navigate("/podcasts");
    } catch (error) {
      console.error("Authentication error:", error);
      setAuthError(error);
    }
  };

  return { authenticate, authError };
};

export default useAuth;
