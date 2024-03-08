import "./App.css";
import { Routes, Route } from "react-router";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Nabar/Navbar";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

function App() {
  return (
    <>
      <Navbar />
      <Provider store={store}>
        <Routes>
          <Route path={"/admin/*"} element={<AdminRoute />} />
          <Route path={"/*"} element={<UserRoute />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
