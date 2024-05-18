import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import RootLayout from "./components/layout/root";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Game from "./pages/game";
import Highscores from "./pages/highscores";
import ErrorPage from "./pages/error";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Login /> },
        { path: "/auth/login", element: <Login /> },
        { path: "/auth/register", element: <Register /> },
        { path: "/home", element: <Home /> },
        { path: "/game", element: <Game /> },
        { path: "/highscores", element: <Highscores /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
};

export default App;
