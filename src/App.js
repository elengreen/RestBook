import './App.css';
import { Routes, Route, Outlet } from "react-router-dom";
import Favourites from './pages/favourites/favourites';
import RestaurantList from './pages/restaurant-list/restaurant-list';
import Header from './components/header/header';
import Login from './pages/login/login';
import Registration from './pages/registration/registration';
import Profile from './pages/profile/profile';
import RestaurantDescription from './pages/restaurant-description/restaurant-description';
import RequireAuth from './components/required-auth/requiredAuth';
import RestaurantBooking from './pages/restaurant-booking/restaurant-booking';
import { useGetUserQuery } from './pages/profile/profileApiSlice';
import BookingRequestsVisitor from './pages/booking-requests-visitor/booking-requests-visitor';
import BookingRequestsOwner from './pages/booking-requests-owner/booking-requests-owner';
import { YMaps } from '@pbe/react-yandex-maps';




function App() {
  const { data: profile = null } = useGetUserQuery();
  return (
    <div className="App">
      <YMaps query={{ lang: 'ru_RU', apikey: '4dfdf3ee-ee33-4660-a1b8-30e6b9a5c34a' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration-restaurant" element={<Registration isAdmin />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<RestaurantList />} />
            <Route path="restaurantDescription/:restId" element={<RestaurantDescription />} />
            <Route element={<RequireAuth />}>
              <Route path="favourites" element={<Favourites />} />
              <Route path="booking" element={profile?.roles[0].name === 'Member' ? <BookingRequestsVisitor /> : <BookingRequestsOwner />} />
              <Route path="profile" element={<Profile />} />
              <Route path="restaurantBooking/:restId" element={<RestaurantBooking />} />
            </Route>
          </Route>
        </Routes>
      </YMaps>
    </div>
  );

}

function Layout() {
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  );
}

export default App;
