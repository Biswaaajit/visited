import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Track from "./pages/Track";
import PageNotFound from "./pages/PageNotFound";
import Cities from "./components/Cities";
import Countries from "./components/Countries";
import City from "./components/City";
import Form from "./components/Form";
import { CityContext } from "./context/CityContext";
function App() {
  return (
    <CityContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="track" element={<Track />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<Cities />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<Countries />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CityContext>
  );
}
export default App;
