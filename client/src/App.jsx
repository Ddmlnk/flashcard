// client/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import StudyMode from "./pages/StudyMode/StudyMode";
import AllCards from "./pages/AllCards/AllCards";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StudyMode />} />
        <Route path="/cards" element={<AllCards />} />
      </Routes>
    </Layout>
  );
}

export default App;
