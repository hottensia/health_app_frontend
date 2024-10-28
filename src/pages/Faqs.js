import React, { useState } from 'react';

const faqs = [
  {
    question: "What is Niskize?",
    answer: "Niskize is a mental health platform that connects individuals with licensed therapists and provides resources for mental wellness."
  },
  {
    question: "How do I schedule an appointment with a therapist?",
    answer: "You can schedule an appointment by browsing our therapist directory, selecting a therapist, and using their available time slots to book a session."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Yes, we take your privacy very seriously. All your personal information and session details are kept strictly confidential and protected by industry-standard encryption."
  },
  {
    question: "What types of therapy are offered?",
    answer: "We offer various types of therapy including Cognitive Behavioral Therapy (CBT), Mindfulness-Based Therapy, Family Therapy, and more. The specific types available depend on our current therapist roster."
  },
  {
    question: "How much does therapy cost?",
    answer: "The cost of therapy varies depending on the therapist and the type of session. We offer a range of options to suit different budgets. Some insurance plans may also cover the cost of therapy."
  }
];

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => (
  <div className="border-b border-gray-200">
    <button
      className="flex justify-between items-center w-full py-5 text-left"
      onClick={toggleOpen}
    >
      <span className="text-lg font-medium text-gray-900">{question}</span>
      <span className="ml-6 flex-shrink-0">
        {isOpen ? (
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </span>
    </button>
    {isOpen && (
      <div className="pb-5">
        <p className="text-base text-gray-500">{answer}</p>
      </div>
    )}
  </div>
);

export const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleOpen(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};