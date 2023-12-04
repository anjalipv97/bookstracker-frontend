import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link , useNavigate} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import bookLogo from '../assets/book-logo.png';
// import { AuthContext } from '../App';
import { useAuth } from '../context/AuthContext';

const BooksTracker = () => {
  const { user, login, logout } = useAuth(); // Use useAuth hook from AuthContext

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5558/books')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from useAuth
    navigate('/'); // Redirect the user to the home screen
  };

  return (
    // <div className='p-4 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 ... h-screen w-screen'>
    
    <div className="p-4 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 h-screen w-screen overflow-x-scroll overflow-y-scroll">  
    {/* <div className='flex flex-col items-center p-4 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 h-screen w-screen'> */ }
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-cyan-500 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-cyan-500 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
      <div className='flex justify-between items-center'>
  <img src={bookLogo} alt="image" style={{ width: '90px', height: '90px' }} />
</div>

        <h1 className='text-3xl my-text-2xl font-serif  text-violet-900 leading-tight mb-88'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-green-950 text-4xl font-bold' />
        </Link>
        
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
      {user && (
        <button onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center">
            Logout
          </button>
        )}
    </div>
  );
};

export default BooksTracker;