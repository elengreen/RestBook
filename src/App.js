import './App.css';
import { Routes, Route, Outlet } from "react-router-dom";
import Favourites from './pages/favourites/favourites';
import RestaurantList from './pages/restaurant-list/restaurant-list';
import Header from './components/header/header';
import Login from './pages/login/login';
import Registration from './pages/registration/registration';
import BookingRequests from './pages/booking-requests/booking-requests';
import Profile from './pages/profile/profile';
import RestaurantDescription from './pages/restaurant-description/restaurant-description';
import RequireAuth from './components/required-auth/requiredAuth';
import { useUserQuery } from './pages/profile/profileApiSlice';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration-restaurant" element={<Registration isAdmin />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<RestaurantList />}/>
          <Route path="restaurantDescription" element={<RestaurantDescription />} />
          <Route element={<RequireAuth />}>
            <Route path="favourites" element={<Favourites />} />
            <Route path="booking" element={<BookingRequests />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
