import React from 'react'

const FAQs = () => {
  const faqs = [
    { question: "How do I book a court?", answer: "You can book a court directly from our website or mobile app." },
    { question: "What are the membership plans?", answer: "We offer monthly, quarterly, and annual memberships." },
    { question: "Can I cancel or reschedule my booking?", answer: "Yes, you can modify your bookings up to 24 hours before the slot." },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-accent mb-2 dark:text-orange-400">Frequently <span className='text-primary dark:text-white'>Asked</span> Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-white dark:bg-gray-900 dark:border  mt-6 p-4 rounded-lg shadow cursor-pointer">
              <summary className="font-semibold dark:text-gray-300">{faq.question}</summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};


export default FAQs