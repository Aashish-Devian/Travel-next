// import { createContext, useEffect, useReducer } from "react";

// // const initial_state = {
// //   user: localStorage.getItem("users") !== null
// //     ? JSON.parse(localStorage.getItem("users"))
// //     : null,
// //   loading: false,
// //   error: null,
// // };

// const initial_state = {
//   user: typeof window !== "undefined" && localStorage.getItem("users") !== null
//     ? JSON.parse(localStorage.getItem("users"))
//     : null,
//   loading: false,
//   error: null,
// };

// export const AuthContext = createContext(initial_state);

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case "LOGIN_SUCCESS":
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case "REGISTER_SUCCESS":
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     case "LOGOUT":
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, initial_state);

//   // useEffect(() => {
//   //     localStorage.setItem("user", JSON.stringify(state.user));
//   // }, [state.user]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("user", JSON.stringify(state.user));
//     }
//   }, [state.user]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         loading: state.loading,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      setUser(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
