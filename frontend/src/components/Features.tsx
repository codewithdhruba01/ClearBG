import { Bot, Image as ImageIcon, CheckCircle, Zap, UploadCloud, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Bot className="w-6 h-6 text-primary" />,
    title: 'AI Background Removal',
    description: 'Automatically detect and remove image backgrounds with high precision.'
  },
  {
    icon: <ImageIcon className="w-6 h-6 text-primary" />,
    title: 'Transparent PNG',
    description: 'Download images with a perfectly transparent background, ready for design.'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
    title: 'High Quality',
    description: 'Preserve the subject with clean, crisp edges around hair and complex objects.'
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: 'Fast Processing',
    description: 'Process images in seconds with a simple, optimized workflow.'
  },
  {
    icon: <UploadCloud className="w-6 h-6 text-primary" />,
    title: 'Drag & Drop',
    description: 'Upload images effortlessly with our intuitive drag-and-drop interface.'
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: 'Privacy Focused',
    description: 'We respect your privacy. Uploaded images are never permanently stored.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
          <p className="text-foreground/70 text-lg">
            Professional-grade tools packaged in an easy-to-use interface.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass glass-hover p-6 rounded-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
