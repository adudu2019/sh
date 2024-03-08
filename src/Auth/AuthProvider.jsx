import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../CreateClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// Login Supabase Function
const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

// SignOut Supabase
const logout = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);

      if (currentUser) {
        getDataUser(currentUser.id);
      } else {
        console.log("Tidak ada data");
        setLoading(false);
      }
    };

    getUser();

    const getDataUser = async (userId) => {
      try {
        const { data: userData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId);

        console.log(userData);
        setUsername(userData[0].username);
        setRole(userData[0].role);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    // get data user
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
      // setLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, auth, logout, username, role, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
