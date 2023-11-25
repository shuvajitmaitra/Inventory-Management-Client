import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';



const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <AuthProvider>
      <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes} />
        <Toaster />
      </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
);
