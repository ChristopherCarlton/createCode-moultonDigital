// Assuming this file is named MainComponent.tsx
"use client";
import React, { ChangeEvent, MouseEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface Input {
  label: string;
  name: string;
  type: "text" | "select" | "button";
  placeholder: string;
  required: boolean;
  pattern?: string;
  options?: Option[];
}

interface LogisticsInfo {
  title: string;
  inputs: Input[];
}

interface MainComponentProps {
  onSkip: () => void;
  currentStep: number;
  logistics: LogisticsInfo | undefined;
  onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onContinue: () => void;
  onBack: () => void;
  onInvalidInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MainComponent: React.FC<MainComponentProps> = ({
  onSkip,
  currentStep,
  logistics,
  onInputChange,
  onContinue,
  onBack,
  onInvalidInput,
}) => {
  const title = logistics?.title;
  const inputs = logistics?.inputs || [];

  const handleInputValidation = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checkValidity()) {
      onInvalidInput(event);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg relative font-roboto flex flex-col">
      <button
        className="absolute top-5 right-5 font-medium text-gray-500"
        onClick={onSkip}
      >
        Skip
      </button>

      <div className="flex justify-center items-center my-2 bg-gray-100 p-4 rounded-full w-20 h-20 mx-auto">
        <i className="fas fa-warehouse text-4xl text-gray-500" />
      </div>

      {title && (
        <h2 className="text-center text-xl font-semibold my-4">{title}</h2>
      )}

      {inputs.map((input) => (
        <div key={input.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {input.label}
          </label>
          {input.type === "select" ? (
            <select
              name={input.name}
              onChange={onInputChange}
              required={input.required}
              className="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-300"
            >
              {input.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : input.type === "button" ? (
            <div className="flex justify-center mt-1">
              <button
                type="button"
                name={input.name}
                // onClick={onInputChange as (event: MouseEvent<HTMLButtonElement>) => void}
                className="w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-300"
              >
                {input.placeholder}
              </button>
            </div>
          ) : (
            <input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              onChange={onInputChange}
              onInvalid={handleInputValidation}
              required={input.required}
              className="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-300"
              pattern={input.pattern}
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-black text-white rounded-md"
        //   onClick={onBack}
        >
          Back
        </button>
        <button
          className="px-4 py-2 bg-black text-white rounded-md"
        //   onClick={onContinue}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StoryComponent: React.FC = () => {
  const handleSkip = () => {};
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {};
  const handleContinue = () => {};
  const handleBack = () => {};
  const handleInvalidInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.classList.add("border-red-500");
    event.target.setCustomValidity("Please match the requested format.");
  };

  const logisticsInfo: LogisticsInfo = {
    title: "Set up your logistics",
    inputs: [
      {
        label: "Full name",
        name: "fullName",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
        pattern: "^[a-zA-Z]+(?:\\s[a-zA-Z]+)+$",
      },
      {
        label: "Username",
        name: "username",
        type: "text",
        placeholder: "Create your username",
        required: true,
        pattern: "^[a-zA-Z0-9_]{1,15}$",
      },
      {
        label: "Location",
        name: "location",
        type: "button",
        placeholder: "Select your location",
        required: true,
      },
      {
        label: "Type of goods handled",
        name: "goodsType",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select type of goods" },
          { value: "perishables", label: "Perishables" },
          { value: "electronics", label: "Electronics" },
          { value: "apparel", label: "Apparel" },
          { value: "furniture", label: "Furniture" },
          { value: "other", label: "Other" },
        ],
      },
      {
        label: "Operational hours",
        name: "operationalHours",
        type: "text",
        placeholder: "Enter operational hours",
        required: true,
        pattern: "^[0-9]{1,2}:[0-9]{2}\\s-(\\s)?[0-9]{1,2}:[0-9]{2}$",
      },
      {
        label: "Size of warehouse",
        name: "warehouseSize",
        type: "text",
        placeholder: "Enter size of warehouse",
        required: true,
        pattern: "^[0-9]+(\\s)?(sq(m|ft)|m2|ft2)$",
      },
    ],
  };

  return (
    <>
      <MainComponent
        onSkip={handleSkip}
        currentStep={1}
        logistics={logisticsInfo}
        onInputChange={handleInputChange}
        onContinue={handleContinue}
        onBack={handleBack}
        onInvalidInput={handleInvalidInput}
      />
    </>
  );
};

export default StoryComponent;
