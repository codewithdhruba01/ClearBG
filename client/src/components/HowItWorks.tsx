import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Upload Image',
    description: 'Drag and drop or browse to select the image you want to process.'
  },
  {
    number: '02',
    title: 'AI Background Removal',
    description: 'Our AI instantly analyzes and precisely cuts out the background.'
  },
  {
    number: '03',
    title: 'Download Result',
    description: 'Select your desired quality (Low, Medium, High) and download your transparent PNG.'
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pt-10 pb-10 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-b border-border py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col text-left"
              >
                <div className="text-foreground/50 text-sm mb-3 font-medium">
                  {step.number}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
