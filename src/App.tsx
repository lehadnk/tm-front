import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./common/ProtectedRoute.tsx";
import TorrentList from "./components/TorrentList.tsx";
import LoginForm from "./components/LoginForm.tsx";
import UserList from "./components/users/UserList.tsx";
import {isAuthenticated} from "./requests/TokenStorage.ts";
import NavigationMenu from "./components/NavigationMenu.tsx";
import {Component} from "react";
import {getCurrentUser} from "./domain/AuthenticationService.ts";
import {ApplicationContext} from "./components/context/ApplicationContext.ts";
import {CurrentUserResponse} from "./requests/responses/CurrentUserResponse.ts";
import EditUserFormWrapper from "./components/users/EditUserForm.tsx";


interface AppState {
    user?: CurrentUserResponse;
}

class App extends Component {
    state: AppState = {
        user: undefined,
    };

    render() {
        return (
            <>
                <ApplicationContext.Provider value={{ user: this.state.user }}>
                    {isAuthenticated() && <NavigationMenu />}
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<LoginForm />} />
                            <Route path="login" element={<LoginForm />} />
                            <Route path="torrents"
                                   element={
                                       <ProtectedRoute role={"user"}>
                                           <TorrentList></TorrentList>
                                       </ProtectedRoute>
                                   }
                            ></Route>
                            <Route path="users"
                                   element={
                                       <ProtectedRoute role={"admin"}>
                                           <UserList></UserList>
                                       </ProtectedRoute>
                                   }
                            ></Route>
                            <Route path="users/create"
                                   element={
                                       <ProtectedRoute role={"admin"}>
                                           <EditUserFormWrapper></EditUserFormWrapper>
                                       </ProtectedRoute>
                                   }
                            ></Route>
                            <Route path="users/:id"
                                   element={
                                       <ProtectedRoute role={"admin"}>
                                           <EditUserFormWrapper></EditUserFormWrapper>
                                       </ProtectedRoute>
                                    }
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                </ApplicationContext.Provider>
            </>
        )
    }

    componentDidMount() {
        if (!isAuthenticated()) {
            return
        }

        const user = getCurrentUser()
        if (user == null) {
            return
        }

        this.setState({user})
        this.forceUpdate()
    }
}

export default App