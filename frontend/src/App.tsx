import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { useBackgroundRemoval } from './hooks/useBackgroundRemoval';

function App() {
  const { 
    status, 
    originalImage, 
    processedImage, 
    errorMessage, 
    processImage, 
    reset 
  } = useBackgroundRemoval();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="grow">
        <Hero 
          status={status}
          originalImage={originalImage}
          processedImage={processedImage}
          onUpload={processImage}
          onReset={reset}
          errorMessage={errorMessage}
        />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
