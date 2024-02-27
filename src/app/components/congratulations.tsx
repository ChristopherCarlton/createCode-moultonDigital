// Assuming this file is named MainComponent.tsx
import React from "react";

interface MainComponentProps {
  title: string;
  message: string;
  onBack: () => void;
  onContinue: () => void;
}

const MainComponent: React.FC<MainComponentProps> = ({ title, message, onBack, onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg w-[400px] h-[500px] m-auto">
      <div className="flex justify-between w-full mb-14">
        <div className="w-16 bg-gray-200 h-1 rounded-full"></div>
        <div className="w-10 bg-gray-200 h-1 rounded-full"></div>
        <div className="w-24 bg-gray-200 h-1 rounded-full"></div>
      </div>
      <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
        <i className="fas fa-handshake fa-3x text-gray-400"></i>
      </div>
      <h1 className="font-bold text-3xl mb-4">{title}</h1>
      <p className="text-gray-600 text-center mb-12">{message}</p>
      <button
        // onClick={onBack}
        className="font-semibold text-gray-600 bg-transparent border border-gray-300 rounded-full py-2 px-8 mb-4"
      >
        Back
      </button>
      <button
        // onClick={onContinue}
        className="font-semibold text-white bg-black rounded-full py-2 px-8"
      >
        Go to app
      </button>
    </div>
  );
};

const StoryComponent: React.FC = () => {
  const title = "Congratulations!";
  const message =
    "Your account has been created successfully. Enjoy the features of the app!";

  const handleBack = () => {
    console.log("Back clicked");
  };

  const handleContinue = () => {
    console.log("Continue to app clicked");
  };

  return (
    <div className="h-screen bg-gray-200 flex">
      <MainComponent
        title={title}
        message={message}
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default StoryComponent;
