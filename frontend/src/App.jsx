import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Components/AppLayout";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { Translator } from "./pages/Translator";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { Dashboard } from "./Components/Dashboard";
import { Features } from "./Components/Features";
import { Feedback } from "./pages/Feedback";
import { Chat } from "./pages/Chat";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Leaderboard } from "./pages/Leaderboard";

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <div>"error-page"</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
              path: "/features",
              element: <Features/>
          },
          {
            path: "/quiz",
            element: <Quiz />,
          },
          {
            path: "/translator",
            element: <Translator />,
          },
          {
            path: "/chat",
            element: <Chat/>,
          },
          {
            path:"/feedback",
            element:<Feedback/>
          },
          {
            path:"/about",
            element:<About/>
          },
          {
            path:"/contact",
            element:<Contact/>
          },
          {
            path:"/leaderboard",
            element:<Leaderboard/>
          }
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={route} />;
}
