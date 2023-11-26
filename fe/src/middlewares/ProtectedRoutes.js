import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GlobalProvider } from "../context/getContext";

export const isAuth = () => {
  const token = localStorage.getItem("loggedInUser");
  return token ? jwtDecode(token) : null;
};

const ProtectedRoutes = () => {
  const { setDataUser } = useContext(GlobalProvider);
  const auth = isAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth) {
        navigate("/login");
        return;
      }

      // Decodifica il token e salva i dati decodificati nel localStorage
      sessionStorage.setItem("userDataDetails", JSON.stringify(auth));

      // Aggiorna lo stato con i dati decodificati
      await setDataUser(auth);
    };

    fetchData();
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
