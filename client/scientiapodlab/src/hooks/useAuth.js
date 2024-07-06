import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetUserQuery,
} from "../api/userApiSlice";
import { setUser } from "../features/user/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [triggerGetUser] = useLazyGetUserQuery();
  const [authError, setAuthError] = useState(null);

  const authenticate = async (credentials, isLogin = true) => {
    try {
      if (isLogin) {
        await login(credentials).unwrap();
      } else {
        await register(credentials).unwrap();
      }

      const { data: user } = await triggerGetUser().unwrap();
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Authentication error:", error);
      setAuthError(error);
    }
  };

  return { authenticate, authError };
};

export default useAuth;
