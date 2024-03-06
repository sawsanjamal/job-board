import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../constants/types";
import {
  getLoggedInUser,
  signup as signupService,
} from "../services/authentication";
import {
  login as loginService,
  logout as logoutService,
} from "../services/authentication";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutDialog } from "../components/LogoutDialog";

type AuthContext = {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoadingUser: boolean;
  user?: User;
};
type AuthProviderProps = {
  children: ReactNode;
};
export const Context = createContext<AuthContext | null>(null);
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setIsLoadingUser(true);
    getLoggedInUser()
      .then(setUser)
      .finally(() => setIsLoadingUser(false));
  }, []);

  function signup(email: string, password: string) {
    return signupService(email, password).then((user) => {
      setUser(user);
      navigate(location.state?.location ?? "/");
    });
  }
  function login(email: string, password: string) {
    return loginService(email, password).then((user) => {
      setUser(user);
      navigate(location.state?.location ?? "/");
    });
  }
  function logout() {
    setIsLogoutModalOpen(true);
    return logoutService()
      .then(() => {
        setUser(undefined);
      })
      .finally(() => setIsLogoutModalOpen(false));
  }
  return (
    <Context.Provider
      value={{
        user,
        isLoadingUser,
        logout,
        login,
        isLoggedIn: user != null,
        signup,
      }}
    >
      {children}
      <LogoutDialog
        isOpen={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
      />
    </Context.Provider>
  );
}
