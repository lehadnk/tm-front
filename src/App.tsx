import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./common/ProtectedRoute.tsx";
import TorrentList from "./components/torrents/TorrentList.tsx";
import LoginForm from "./components/LoginForm.tsx";
import UserList from "./components/users/UserList.tsx";
import {isAuthenticated} from "./requests/TokenStorage.ts";
import NavigationMenu from "./components/NavigationMenu.tsx";
import {Component} from "react";
import {getCurrentUser} from "./domain/AuthenticationService.ts";
import {CurrentUserResponse} from "./requests/responses/CurrentUserResponse.ts";
import EditUserFormWrapper from "./components/users/EditUserForm.tsx";
import UploadTorrentFileFormWrapper from "./components/torrents/UploadTorrentFileForm.tsx";


interface AppState {
    user?: CurrentUserResponse
}

class App extends Component {
    state: AppState = {
        user: undefined,
    };

    handleLogin = (user: CurrentUserResponse) => {
        this.setState({ user });
    };

    async componentDidMount() {
        if (!isAuthenticated()) {
            return
        }

        const user = await getCurrentUser()
        if (user == null) {
            return
        }

        this.setState({user})
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    {this.state.user != undefined && <NavigationMenu user={this.state.user} />}
                    <Routes>
                        <Route
                            index
                            element={isAuthenticated() ? <Navigate to="/torrents" /> : <LoginForm login={this.handleLogin} />}
                        />
                        <Route
                            path="login"
                            element={isAuthenticated() ? <Navigate to="/torrents" /> : <LoginForm login={this.handleLogin} />}
                        />
                        <Route path="torrents"
                               element={
                                   <ProtectedRoute role={"user"}>
                                       <TorrentList></TorrentList>
                                   </ProtectedRoute>
                               }
                        ></Route>
                        <Route path="torrents/add"
                               element={
                                   <ProtectedRoute role={"user"}>
                                       <UploadTorrentFileFormWrapper></UploadTorrentFileFormWrapper>
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
            </>
        )
    }
}

export default App