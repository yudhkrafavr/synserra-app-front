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

function App() {
  const [isSubmissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [submittedProjectInfo, setSubmittedProjectInfo] = useState(null);

  // Function to open submission modal with selected card data
  const openSubmissionModal = (card) => {
    setSelectedCard(card);
    setSubmissionModalOpen(true);
  };

  // Handle custom template submission from navbar
  useEffect(() => {
    const handleCustomWorkClick = (event) => {
      setSelectedCard({
        title: event.detail.templateTitle
      });
      setSubmissionModalOpen(true);
    };

    window.addEventListener('openJobSubmissionModal', handleCustomWorkClick);
    return () => {
      window.removeEventListener('openJobSubmissionModal', handleCustomWorkClick);
    };
  }, []);
  // Function to close submission modal
  const closeSubmissionModal = () => setSubmissionModalOpen(false);
  
  // Function to handle form submission
  const handleSubmit = (data) => {
    // store API response from JobSubmissionModal
    setSubmittedProjectInfo(data);
    closeSubmissionModal();
    setSuccessModalOpen(true);
  };
  
  
  // Function to close success modal
  const closeSuccessModal = () => setSuccessModalOpen(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
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
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
              <Widget />
              <HeadingTitle headingTitle="Pick your today’s template" />
              <Cards onCreateProjectClick={openSubmissionModal} />
              </>
            } />
            <Route path="/dashboard" element={
              <>
                <WidgetDashboard />
                <Dashboard onCreateProjectClick={openSubmissionModal} />
              </>
            } />
            <Route path="/portfolio" element={
              <>
              <WidgetPortfolio />
              <HeadingTitle headingTitle="Our Recent Works" />
              <CardsPorto />
              </>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
