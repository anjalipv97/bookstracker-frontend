 
import React from 'react';
import { Routes, Route , Navigate} from 'react-router-dom';
import BooksTracker from './pages/BooksTracker';
import CreateBook from './pages/CreateBooks';
import Showbook from './pages/Showbook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import NotFound from "./pages/NotFound";
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/Login';
// import { AuthProvider } from './context/AuthContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const AuthContext = React.createContext();

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  const [user, setUser] = React.useState(null);

  const login = (token) => {
    setUser({ token });
  };

  const logout = () => {
    setUser(null);
  };

  const authContextValue = {
    user,
    login,
    logout,
  };

//   return (
//     // <AuthContext.Provider value={authContextValue}>
//     <AuthProvider>
//     <Routes>
      
//       <Route path='/books' element={<BooksTracker />} />
//       <Route path='/books/create' element={<CreateBook />} />
//       <Route path='/books/details/:id' element={<Showbook />} />
//       <Route path='/books/edit/:id' element={<EditBook />} />
//       <Route path='/books/delete/:id' element={<DeleteBook />} />
//       <Route path='*' element={<NotFound />} />
//       <Route path='/' element={<BooksTracker />} />
//       <Route path='/signup' element={<Signup />} />
//       <Route path='/login' element={<Login />} />
      
//       </Routes>
//       </AuthProvider>
    
//   );
// };

return (
  <AuthProvider>
    <Routes>
      <Route path="/books" element={<ProtectedRoute element={<BooksTracker />} />} />
      <Route path="/books/create" element={<ProtectedRoute element={<CreateBook />} />} />
      <Route path="/books/details/:id" element={<ProtectedRoute element={<Showbook />} />} />
      <Route path="/books/edit/:id" element={<ProtectedRoute element={<EditBook />} />} />
      <Route path="/books/delete/:id" element={<ProtectedRoute element={<DeleteBook />} />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </AuthProvider>
);
};  
export default App;
export { AuthContext };
