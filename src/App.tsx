import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loading } from "./components/loader";
import Layout from "./layout";

export default function () {
  const Home = lazy(() => import("@/pages/home"));
  const Weather = lazy(() => import("@/pages/weather"));
  const PhotoGallery = lazy(() => import("@/pages/gallery"));
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/gallery" element={<PhotoGallery />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}
