import React from "react";

const frameworks = [
  "ISO 27001",
  "SOC 2",
  "PCI DSS",
  "HIPAA",
  "NIST CSF",
  "GDPR",
];

const FrameworkGrid = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Supported Frameworks
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {frameworks.map((fw, idx) => (
            <div
              key={idx}
              className="border p-3 bg-white rounded text-center text-sm"
            >
              {fw}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworkGrid;
