import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./common/ProtectedRoute.tsx";
import TorrentList from "./components/TorrentList.tsx";
import LoginForm from "./components/LoginForm.tsx";
import UserList from "./components/UserList.tsx";
import {isAuthenticated} from "./requests/TokenStorage.ts";
import NavigationMenu from "./components/NavigationMenu.tsx";

function App() {
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

export default App