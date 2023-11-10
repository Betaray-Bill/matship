import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PrivateRoute from './Components/PrivateRoute';
import Pagenotfound from './Pages/Pagenotfound';
import Upload from './Pages/Upload';
import Demo from './Pages/Demo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/pagenotfound" element={<Pagenotfound />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />}/>
          {/* <Route path="/" element={<Demo />}/> */}
          <Route path="/uploadData" element={<Upload />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
