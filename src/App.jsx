import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import QuickStatistics from "./components/QuickStatistics";
import DynamicComparisonGraph from "./components/DynamicComparisonGraph";
import QuestionAnalysisChart from "./components/QuestionAnalysisChart";
import SkillTestCard from "./components/SkillTestCard";
import SyllabusAnalysis from "./components/SyllabusAnalysis";
import UpdatePopup from "./components/UpdatePopup";
import { BsGraphUpArrow } from "react-icons/bs";

const App = () => {
  const [percentile, setPercentile] = useState(50);
  const [correctAnswers, setCorrectAnswers] = useState(7);
  const [rank, setRank] = useState(7);
  const [showPopup, setShowPopup] = useState(false);

  const handleUpdateClick = () => {
    setShowPopup(true);
  };

  const handleSave = (updatedValues) => {
    setRank(updatedValues.rank);
    setPercentile(updatedValues.percentile);
    setCorrectAnswers(updatedValues.score);
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-row">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex flex-col sm:w-max sm:p-8">
          <div className="relative">
            <span className="text-sm font-semibold text-gray-600 mb-4 block">
              Skill Text
            </span>
            <SkillTestCard onUpdateClick={handleUpdateClick} />
          </div>

          {/* Quick Statistics */}
          <QuickStatistics
            rank={rank}
            percentile={percentile}
            correctAnswers={correctAnswers}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* Dynamic Comparison Graph */}
            <div className="bg-white rounded-lg border-2 border-gray-100 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold mb-2">Comparison Graph</h2>
                <div className="bg-gray-100 w-[50px] h-[50px] border-gray-200 border-2 rounded-[100px] flex items-center justify-center">
                  <BsGraphUpArrow />
                </div>
              </div>

              <DynamicComparisonGraph percentile={percentile} />
            </div>

            {/* Question Analysis */}
            <div className="bg-white rounded-lg border-2 border-gray-100 p-4 pt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold  mb-2">Question Analysis</h2>
                <span className="text-sm font-bold text-blue-700">
                  {correctAnswers}/15
                </span>
              </div>
              <div>
                <QuestionAnalysisChart correct={correctAnswers} total={15} />
              </div>
            </div>
          </div>

          {/* Syllabus Analysis */}
          <div className="bg-white rounded-lg p-4 mt-4 border-2 border-gray-100 pt-5 pb-5">
            <h2 className="text-sm font-bold mb-2 p-3">
              Syllabus Wise Analysis
            </h2>
            <SyllabusAnalysis />
          </div>
        </div>

        {/* Update Popup */}
        {showPopup && (
          <UpdatePopup
            onSave={handleSave}
            onClose={handleClose}
            defaultValues={{ rank, percentile, score: correctAnswers }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
