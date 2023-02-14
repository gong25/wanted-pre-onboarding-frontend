import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import routes from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {routes.map((route) => {
            return <Route path={route.path} element={route.element} key={route.path} exact />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
