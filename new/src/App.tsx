
import Router from "./Router"
import FooterLayout from "./pages/layouts/footer"
import HeaderLayout from "./pages/layouts/header"
import "./components/applayout.css"
import { useState, useEffect } from 'react';
import anime from "animejs/lib/anime.es.js";
function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    anime({
      targets: 'html, body',
      scrollTop: 0,
      duration: 1500,
      easing: 'easeInOutExpo'
    });
  };
  return (
    <>
      <HeaderLayout />

      <Router />

      {showButton && (
        <a href="#" className="btn btn-primary border-3 border-primary rounded-circle back-to-top" onClick={scrollToTop}><i className="fa fa-arrow-up"></i></a>
      )}
      <FooterLayout />
    </>
  )
}

export default App
