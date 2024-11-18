import {createContext} from "react";
import {CurrentUserResponse} from "../../requests/responses/CurrentUserResponse.ts";

class ApplicationContext {
    user?: CurrentUserResponse
}

export const applicationContext = createContext<ApplicationContext>(new ApplicationContext())