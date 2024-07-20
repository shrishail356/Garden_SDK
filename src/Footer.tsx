import React from "react";

const ProcessFlow: React.FC = () => {
  const steps = [
    { number: 1, label: "Initiate" },
    { number: 2, label: "Awaiting Counterparty Deposit" },
    { number: 3, label: "Redeem" },
    { number: 4, label: "Success" },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto my-12">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold shadow-md border-2 border-blue-700">
              {step.number}
            </div>
            <span className="mt-3 text-sm text-gray-700 font-medium">
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 bg-blue-300 mx-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProcessFlow;
