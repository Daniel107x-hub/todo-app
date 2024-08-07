import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoPage from "./pages/Todo/TodoPage";
import Header from "./components/Header/Header";
import {Provider} from "react-redux";
import configureStore from "./redux/store";

function App() {
  return (
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
                        url: "/"
                    }
                ]}
            />
            <Routes>
                <Route path={"/"} element={<TodoPage/>}/>
            </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
