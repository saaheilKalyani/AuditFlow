import React from "react";

const features = [
  { title: "Frameworks", desc: "Manage ISO, SOC, PCI, HIPAA & more." },
  { title: "Gap Analysis", desc: "Identify gaps and generate remediation plans." },
  { title: "Mapping", desc: "Map controls between multiple frameworks easily." },
  { title: "Reports", desc: "Generate audit-ready reports instantly." },
];

const FeatureCards = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Platform Features
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, idx) => (
            <div key={idx} className="border p-4 rounded bg-gray-50">
              <h4 className="font-semibold mb-2">{f.title}</h4>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
