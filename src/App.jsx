import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      <ToastContainer />
      <div className="m-0 p-0">
        <Outlet></Outlet>
      </div>
    </AuthProvider>
  );
}

export default App;
