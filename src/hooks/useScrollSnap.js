import { useEffect } from 'react';

const useScrollSnap = (containerRef, setCurrentSection) => {
  useEffect(() => {
    const sectionHeight = window.innerHeight;
    let isScrolling = false;
    let scrollTimeout;
    
    const handleScroll = () => {
      // Clear any previous timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to run after scrolling ends
      scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const sectionIndex = Math.round(scrollPosition / sectionHeight);
        
        // Snap to the nearest section
        window.scrollTo({
          top: sectionIndex * sectionHeight,
          behavior: 'smooth'
        });
        
        setCurrentSection(sectionIndex);
        isScrolling = false;
      }, 50);
    };

    // For wheel events, we want to handle them directly for better control
    const handleWheel = (e) => {
      if (isScrolling) return;
      
      isScrolling = true;
      const direction = e.deltaY > 0 ? 1 : -1;
      const currentScrollPosition = window.scrollY;
      const currentSectionIndex = Math.round(currentScrollPosition / sectionHeight);
      const targetSectionIndex = Math.min(
        Math.max(0, currentSectionIndex + direction),
        3 // Hardcoded for 4 sections (0-3)
      );
      
      if (targetSectionIndex !== currentSectionIndex) {
        setCurrentSection(targetSectionIndex);
        window.scrollTo({
          top: targetSectionIndex * sectionHeight,
          behavior: 'smooth'
        });
        
        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      } else {
        isScrolling = false;
      }
    };

    // Initial position check
    const initialCheck = () => {
      const scrollPosition = window.scrollY;
      const sectionIndex = Math.round(scrollPosition / sectionHeight);
      setCurrentSection(sectionIndex);
    };
    
    initialCheck();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('resize', initialCheck);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', initialCheck);
      clearTimeout(scrollTimeout);
    };
  }, [containerRef, setCurrentSection]);
};

export default useScrollSnap;