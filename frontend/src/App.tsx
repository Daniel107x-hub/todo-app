import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoPage from "./pages/Todo/TodoPage";
import Header from "./components/Header/Header";
import {Provider} from "react-redux";
import configureStore from "./redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/Login/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const CLIENT_ID = '174781855654-kqj54pb38ncgvc1c465537nrv4pcegv8.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Provider store={configureStore()}>
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
                    <Route path={'/'} element={<PrivateRoute/>}>
                        <Route index element={<TodoPage/>}/>
                    </Route>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path='*' element={<div>404 Not Found</div>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
