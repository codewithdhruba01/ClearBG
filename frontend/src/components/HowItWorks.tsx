import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Upload',
    description: 'Upload your image using drag and drop or click to browse.'
  },
  {
    number: '02',
    title: 'Remove',
    description: 'AI automatically analyzes the image and removes the background.'
  },
  {
    number: '03',
    title: 'Download',
    description: 'Download your high-quality transparent PNG instantly.'
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-foreground/70 text-lg">
            Three simple steps to a perfect transparent background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border z-0"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-background border-4 border-border flex items-center justify-center mb-6 shadow-xl text-3xl font-bold text-primary">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-foreground/70 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
