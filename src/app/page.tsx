import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Events from '@/sections/Events';
import Gallery from '@/sections/Gallery';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <main>
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Events />
        <Gallery />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
