import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import Header from "./components/Header/Header";

function App() {
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
                    url: "/"
                }
            ]}
        />
        <Routes>
            <Route path={"/"} element={<TodoPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
