import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <SignInPage/> }/>
      <Route path="/cadastro" element={<SignUpPage/>}/>
      <Route path="/produtos" element={ <ProductsPage/> }/>
    </Routes>
  );
}

export default App
