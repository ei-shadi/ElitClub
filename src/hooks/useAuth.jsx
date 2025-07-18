import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const useAuth = () => {
  const authData = useContext(AuthContext);
  return authData;
};

export default useAuth;