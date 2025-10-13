import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/fonts.css";
import Footer from "./components/Footer";
import WidgetDashboard from "./components/WidgetDashboard";
import Cards from "./components/Cards";
import Navbar from "./components/Navbar";
import Widget from "./components/Widget";
import HeadingTitle from "./components/HeadingTitle";
import JobSubmissionModal from "./components/JobSubmissionModal";
import JobSubmittedSuccess from "./components/JobSubmittedSuccess";
import Dashboard from "./components/Dashboard";
import CardsPorto from "./components/CardsPorto";
import WidgetPortfolio from "./components/WidgetPortfolio";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute"; // 🟢 added
import NotFound from "./components/NotFound";

function App() {
  const [isSubmissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [submittedProjectInfo, setSubmittedProjectInfo] = useState(null);

  const openSubmissionModal = (card) => {
    setSelectedCard(card);
    setSubmissionModalOpen(true);
  };

  useEffect(() => {
    const handleCustomWorkClick = (event) => {
      setSelectedCard({ title: event.detail.templateTitle });
      setSubmissionModalOpen(true);
    };

    window.addEventListener("openJobSubmissionModal", handleCustomWorkClick);
    return () => {
      window.removeEventListener("openJobSubmissionModal", handleCustomWorkClick);
    };
  }, []);

  const closeSubmissionModal = () => setSubmissionModalOpen(false);

  const handleSubmit = (data) => {
    setSubmittedProjectInfo(data);
    closeSubmissionModal();
    setSuccessModalOpen(true);
  };

  const closeSuccessModal = () => setSuccessModalOpen(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* 🟢 Move Navbar inside protected route only */}
        <Routes>
          {/* 🟢 Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* 🟢 Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Widget />
                  <HeadingTitle headingTitle="Pick your today’s template" />
                  <Cards onCreateProjectClick={openSubmissionModal} />
                  <Footer />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <WidgetDashboard />
                  <Dashboard onCreateProjectClick={openSubmissionModal} />
                  <Footer />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <WidgetPortfolio />
                  <HeadingTitle headingTitle="Our Recent Works" />
                  <CardsPorto />
                  <Footer />
                </>
              </PrivateRoute>
            }
          />
          <Route
  path="*"
  element={
    <PrivateRoute>
      <NotFound />
    </PrivateRoute>
  }
/>

        </Routes>
        


        {/* 🟢 Modals are outside router context so they always work */}
        <JobSubmissionModal
          isOpen={isSubmissionModalOpen}
          onClose={closeSubmissionModal}
          onSubmit={handleSubmit}
          templateTitle={selectedCard?.title}
          templateId={selectedCard?.id}
        />
        <JobSubmittedSuccess
          isOpen={isSuccessModalOpen}
          onClose={closeSuccessModal}
          projectInfo={submittedProjectInfo}
        />
      </div>
    </Router>
  );
}

export default App;
