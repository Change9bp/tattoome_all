import { Outlet, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import { useContext, useEffect } from "react";
import { GlobalProvider } from "../context/getContext";

// installare npm i jwt-decoded
export const isAuth = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

const ProtectedRoutes = () => {
  const { setDataUser } = useContext(GlobalProvider);
  const auth = isAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth) {
        // Se l'utente non è autenticato, puoi gestire qui il reindirizzamento o fare altre azioni
        console.log(
          "Utente non autenticato. Reindirizzamento o altre azioni..."
        );
        // In questo esempio, reindirizza l'utente alla pagina di login
        // Puoi utilizzare `useNavigate` per eseguire il reindirizzamento in base alla tua logica
        return <Login />;
      }

      // Decodifica il token se esiste
      const decoded = jwtDecode(auth);

      console.log("Dati del token decriptato:", decoded);

      // Salva i dati decodificati nel localStorage con la chiave "userDataDetails"
      localStorage.setItem("userDataDetails", JSON.stringify(decoded));

      // Ottieni i dati dell'utente dal localStorage
      await setDataUser(JSON.parse(localStorage.getItem("userDataDetails")));
    };

    fetchData();
  }, [auth, setDataUser]);

  // Restituisci i componenti figlio tramite Outlet
  return <Outlet />;
};

export default ProtectedRoutes;
