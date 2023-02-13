import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import routes from "./routes";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navbar />
        <Routes>
          {routes.map((route) => {
            return <Route path={route.path} element={route.element} key={route.path} exact />;
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
