// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers"; // hoặc "./routers/index"

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Chỉ ở đây dùng */}
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
