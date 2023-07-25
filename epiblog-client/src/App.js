import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import ProtectedRoutes from './middleware/ProtectedRoutes.js';
import UsersList from './pages/UsersList';
import PostsList from './pages/PostsList';
import Success from './pages/Success';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path='/' element={<Login/>} />
        <Route path="/success" element={<Success/>}/> 


        <Route element={<ProtectedRoutes />}>
          <Route path={'/homepage'} element={<Homepage/>} />
          <Route path={'/posts'} element={<PostsList/>} />
          <Route path='/users' element={<UsersList/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
