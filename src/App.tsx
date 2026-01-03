
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Mission } from './sections/Mission';
import { Demo } from './sections/Demo';
import { AutomationDemo } from './sections/AutomationDemo';
import { Features } from './sections/Features';
import { Waitlist } from './sections/Waitlist';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-synq-bg text-synq-text-primary selection:bg-synq-accent-cyan/30">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Demo />
        <AutomationDemo />
        <Features />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

export default App;
