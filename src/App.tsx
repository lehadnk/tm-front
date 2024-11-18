import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./common/ProtectedRoute.tsx";
import TorrentList from "./components/TorrentList.tsx";
import LoginForm from "./components/LoginForm.tsx";
import UserList from "./components/UserList.tsx";
import {isAuthenticated} from "./requests/TokenStorage.ts";
import NavigationMenu from "./components/NavigationMenu.tsx";
import {Component} from "react";
import {getCurrentUser} from "./domain/AuthenticationService.ts";
import {applicationContext} from "./components/context/ApplicationContext.ts";

class App extends Component {
    private context= applicationContext

    render() {
        return (
            <>
                {isAuthenticated() && <NavigationMenu />}
                <BrowserRouter>
                    <Routes>
                        <Route index element={<LoginForm />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="torrents"
                               element={
                                   <ProtectedRoute>
                                       <TorrentList></TorrentList>
                                   </ProtectedRoute>
                               }
                        ></Route>
                        <Route path="users"
                               element={
                                   <ProtectedRoute>
                                       <UserList></UserList>
                                   </ProtectedRoute>
                               }
                        ></Route>
                    </Routes>
                </BrowserRouter>
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
        //this.context. user = user

    }
}

export default App