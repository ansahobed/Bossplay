import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LatestReleases } from './components/LatestReleases';
import { FeaturedVideos } from './components/FeaturedVideos';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Partners } from './components/Partners';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';


function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main>
        <Hero />
        <LatestReleases />
        <FeaturedVideos />
        <AboutUs />
        <Services />
        <Events />
        <Gallery />
        <Testimonials />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;