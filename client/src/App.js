import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/addContact" element={<AddEdit />} />
          {/* Change "/edit/:id" to "/update/:id" */}
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/delete/:id" element={<AddEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
