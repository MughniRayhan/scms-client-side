import React from 'react'
import {createBrowserRouter} from "react-router";
import RootLayout from '../Layouts/RootLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';
import AuthLayout from '../Layouts/AuthLayout';
import Courts from '../Pages/Courts/Courts';
import Forbidden from '../Pages/Forbidden/Forbidden';
import Loader from '../Components/Loader/Loader';
import DashboardLayout from '../Layouts/DashboardLayout';
import PrivateRoute from '../Routes/PrivateRoute';
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome';
import MyProfile from '../Pages/Dashboard/MyProfile/MyProfile';
import PendingBookings from '../Pages/Dashboard/PendingBookings/PendingBookings';
import Announcements from '../Pages/Dashboard/Announcement/Announcements';
import ManageBookingsApproval from '../Pages/Dashboard/ManageBookingsApproval/ManageBookingsApproval';
import AdminRoute from '../Routes/AdminRoute';
import ManageMembers from '../Pages/Dashboard/ManageMembers/ManageMembers';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: '/courts',
          Component: Courts,
          loader: ()=> fetch("./courts.json"),
          hydrateFallbackElement: <Loader/>
        },
        {
        path: '/forbidden',
        Component: Forbidden
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>, 
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'myProfile',
        Component: MyProfile
      },
      {
        path: 'pendingBookings',
        Component: PendingBookings
      },
      {
        path:'announcements',
        Component: Announcements
      },
      {
        path: 'manageBookingsApproval',
        element: <AdminRoute><ManageBookingsApproval></ManageBookingsApproval></AdminRoute>
      },
      {
        path: 'manageMembers',
        element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>
      }
    ]
  }
]);

