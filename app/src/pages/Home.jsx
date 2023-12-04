import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Home = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5007",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  // return (
  //   <>
  //     <div className="home_page">
  //       <h4>
  //         {" "}
  //         Welcome <span>{username}</span>
  //       </h4>
  //       <button onClick={Logout}>LOGOUT</button>
  //     </div>
  //     <ToastContainer />
  //   </>
  // );
  return (
    <div>
      <h2>Home</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in to access this page.</p>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
