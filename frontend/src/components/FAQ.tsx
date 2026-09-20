import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What image formats are supported?',
    answer: 'We support common image formats including PNG, JPG, JPEG, and WEBP.'
  },
  {
    question: 'What is the maximum image size?',
    answer: 'You can upload images up to 10MB in size.'
  },
  {
    question: 'Is the background removal automatic?',
    answer: 'Yes, our AI automatically detects the main subject and removes the background without any manual selection needed.'
  },
  {
    question: 'Can I download a transparent PNG?',
    answer: 'Absolutely. The processed image is provided as a high-quality PNG with a transparent background.'
  },
  {
    question: 'Are uploaded images stored?',
    answer: 'No. We process the images on the fly and delete them immediately after processing to protect your privacy.'
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass rounded-2xl overflow-hidden border border-border"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg text-foreground">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-foreground/50 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-foreground/70">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
