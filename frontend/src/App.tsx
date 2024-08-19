import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoPage from "./pages/Todo/TodoPage";
import Header from "./components/Header/Header";
import {Provider} from "react-redux";
import { persistedStore } from "./redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/Login/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {ToastContainer} from "react-toastify";
import {PersistGate} from "redux-persist/integration/react";
import {LOGIN_PATH, ROOT_PATH} from "./constants/constants";

const CLIENT_ID = '174781855654-kqj54pb38ncgvc1c465537nrv4pcegv8.apps.googleusercontent.com';

function App() {
    const { store, persistor } = persistedStore();
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
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
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    );
}

export default App;
