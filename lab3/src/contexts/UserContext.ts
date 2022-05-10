import React from "react";
import User from "../types/User";

type LoginFunction = (login: string) => void;
type LogoutFunction = () => void;

const UserContext = React.createContext<[User | null, LoginFunction, LogoutFunction]>([null, () => {}, () => {}]);

export default UserContext;
