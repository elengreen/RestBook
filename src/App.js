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




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<RestaurantList />}/>
          <Route path="favourites" element={<Favourites />} />
          <Route path="booking" element={<BookingRequests />} />
          <Route path="profile" element={<Profile />} />
          <Route path="restaurantDescription" element={<RestaurantDescription />} />
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
