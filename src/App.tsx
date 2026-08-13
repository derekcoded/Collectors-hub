import { Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import ToastStack from "./components/ToastStack";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import CommunityFeed from "./pages/CommunityFeed";
import PostDetail from "./pages/PostDetail";
import MyCollection from "./pages/MyCollection";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/marketplace" replace />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<ProductDetail />} />
            <Route path="/community" element={<CommunityFeed />} />
            <Route path="/community/:id" element={<PostDetail />} />
            <Route path="/collection" element={<MyCollection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ToastStack />
      </div>
    </AppProvider>
  );
}
