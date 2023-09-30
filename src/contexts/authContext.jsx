"use client"
import { createContext, useCallback, useContext, useMemo } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  login: (authTokens) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const authTokensInLocalStorage = Cookies.get("authTokens");

  const login = useCallback(function (authTokens) {
    Cookies.set("authTokens", JSON.stringify(authTokens));
  }, []);

  const logout = useCallback(function () {
    Cookies.remove("authTokens");
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
