import React from 'react';
import Splash from '../splash/Splash';
import Navbar from '../navbar/Navbar';
import About from '../about/About';
import Projects from '../projects/Projects';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';

import './App.css';
import '../responsive.css';

function App() {
  return (
    <div className="App" id="home">
      <header className="App-header">
        <Splash />
      </header>
      <Navbar />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
