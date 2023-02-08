import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './Home/Home';
import AddCard from './Pages/AddCardToFirebase/AddCard';
import AddCardTwo from './Pages/AddCardToFirebase/AddCardTwo';
import Card from './Pages/Card/Card';
import Navbar from './Pages/Navbar/Navbar';
import Profile from './Pages/Profile/Profile';
import UserProfile from './Pages/UserProfile/UserProfile';
import ProfilePage from './ProfilePage/ProfilePage';
import SignIn from './Signin/SignIn';
import SignInPage from './Signin/SignInPage';
import Signup from './Signup/Signup';
import SignupPage from './Signup/SignupPage';
import Work from './Work';

function App() {
  
  return (
    <>
    <Router basename="/SocialBook">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<SignInPage/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='signup' element={<SignupPage/>}/>
        <Route path='card' element={<Card/>}/>
        <Route path='profile' element={<UserProfile/>}/>
      </Routes>
    </Router>
      {/* <Profile/> */}
      {/* <ProfilePage/> */}
      {/* <AddCardTwo/> */}
      {/* <AddCard/> */}
      {/* <Card /> */}
      {/* <Signup/> */}

    </>
  );
}

export default App;
