import { useState } from "react";
import faqs from "../../data/faq";

const FAQQna = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-screen-2xl mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 md:pr-6 mb-6 md:mb-0">
          <ul className="space-y-2">
            {faqs.map((qna, index) => (
              <li key={index}>
                <button
                  className={`w-full text-left p-2 rounded ${
                    activeTab === index
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {qna.category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              {faqs[activeTab].category}
            </h2>
            {faqs[activeTab].questions.map((item, idx) => (
              <div key={idx} className="mb-3">
                <h3 className="text-xl font-medium mb-2">{item.question}</h3>
                <p className="text-gray-700 text-lg mb-4">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQQna;