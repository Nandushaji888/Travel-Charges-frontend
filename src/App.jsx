// import CollectionSummary from './CollectionSummary';
// import PassengerSummary from './PassengerSummary';
import "./App.css";
import JourneyForm from "./components/JourneyBookingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import AdminPage from "./components/AdminPage";

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/signup" element={<RegisterPage/>} />
        <Route path="/create-journey" element={<JourneyForm/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/admin/passenger-summary/:id" element={<JourneyForm/>} />
      </Routes>
    </Router>
    // <div>
    //   {/* <CollectionSummary />
    //   <PassengerSummary /> */}
    //   {/* <RegisterPage/> */}
    //   <JourneyForm/>
    // </div>
  );
};

export default App;
