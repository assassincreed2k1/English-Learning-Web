// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers"; // hoặc "./routers/index"
import { Provider } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./api/userSlice";
function FetchProfileOnStart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  return null;
}
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FetchProfileOnStart />

        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
