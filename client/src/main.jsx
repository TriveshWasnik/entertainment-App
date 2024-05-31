import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MoviesPage from "./pages/MoviesPage.jsx";
import TVSeriesPage from "./pages/TVSeriesPage.jsx";
import BookmarkedPage from "./pages/BookmarkedPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SearchPage from "./pages/SearchPage.jsx";

/* Client Side Route */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute authentication>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedRoute authentication={false}>
            <SignupPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/movies",
        element: (
          <ProtectedRoute authentication>
            <MoviesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tvseries",
        element: (
          <ProtectedRoute authentication>
            <TVSeriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search/:qry",
        element: (
          <ProtectedRoute authentication>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bookmarked",
        element: (
          <ProtectedRoute authentication>
            <BookmarkedPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
