import {createContext} from "react";
import {CurrentUserResponse} from "../../requests/responses/CurrentUserResponse.ts";

export class ApplicationContextType {
    user?: CurrentUserResponse
}

export const ApplicationContext = createContext<ApplicationContextType>(new ApplicationContextType())