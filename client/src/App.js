import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Article from "./components/Article/Article";
import CreateBlog from './components/CreateBlog/CreateBlog';
import SignUp from './components/Register/SignUp';
import Login from './components/Login/Login';
import Layout from './components/Layout';
import RequiredAuth from "./components/RequiredAuth/RequiredAuth"
function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route  index element={<Home />} />
      <Route path=':id' element={<Article />} />
      <Route element={<RequiredAuth />}>
      <Route path='createblog' element={<CreateBlog />} />
      </Route>
      <Route path='editblog/:id' element={<CreateBlog />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      </Route>
      </Routes>

    <Footer />
    </Router>
  );
}

export default App;
