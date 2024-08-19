import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoPage from "./pages/Todo/TodoPage";
import Header from "./components/Header/Header";
import LoginPage from './pages/Login/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {ToastContainer} from "react-toastify";
import {LOGIN_PATH, ROOT_PATH} from "./constants/constants";
import useAxiosInterceptor from "./client/useAxiosInterceptor";



function App() {
    useAxiosInterceptor();
    return (
        <BrowserRouter>
            <Header
                brand={{
                    title: "X App",
                    url: "/"
                }}
                links={[
                    {
                        title: "Home",
                        url: "/",
                        isPrivate: true
                    }
                ]}
            />
            <Routes>
                <Route path={ROOT_PATH} element={<PrivateRoute/>}>
                    <Route index element={<TodoPage/>}/>
                </Route>
                <Route path={LOGIN_PATH} element={<LoginPage/>}/>
                <Route path='*' element={<div>404 Not Found</div>}/>
            </Routes>
            <ToastContainer position="bottom-right"/>
        </BrowserRouter>
    );
}

export default App;
