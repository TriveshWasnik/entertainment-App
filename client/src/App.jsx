import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import { useSelector } from "react-redux";

function App() {
  // get the auth user from redux store
  const { authUser } = useSelector((store) => store.user);
  return (
    <Container>
      <div className={` ${authUser ? "pt-10" : ""} flex flex-col lg:flex-row`}>
        <Navbar />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </Container>
  );
}

export default App;
