import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const smoothAnimation = () => {
      const easing = 0.15;
      const deltaX = mousePosition.x - cursorRef.current.x;
      const deltaY = mousePosition.y - cursorRef.current.y;

      cursorRef.current.x += deltaX * easing;
      cursorRef.current.y += deltaY * easing;

      if (dotRef.current && glowRef.current) {
        const transform = `translate(${cursorRef.current.x}px, ${cursorRef.current.y}px) translate(-50%, -50%)`;
        dotRef.current.style.transform = transform;
        glowRef.current.style.transform = transform;
      }

      animationFrameId = requestAnimationFrame(smoothAnimation);
    };

    smoothAnimation();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  useEffect(() => {
    const moveCursor = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const checkCursorType = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y);
      if (!hoveredElement) return;

      const style = window.getComputedStyle(hoveredElement);
      setIsPointer(style.cursor === 'pointer');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousemove', checkCursorType);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor on all elements
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
      *, *:hover {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', checkCursorType);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.head.removeChild(styleSheet);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      <div 
        ref={dotRef}
        className={`fixed rounded-full pointer-events-none z-50
          ${isClicking ? 'w-3 h-3' : isPointer ? 'w-5 h-5' : 'w-4 h-4'}
        `}
        style={{
          left: 0,
          top: 0,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s',
          backgroundColor: '#FFFF00', // Bright yellow for high contrast
        }}
      />

      <div 
        ref={glowRef}
        className={`fixed rounded-full pointer-events-none z-40 blur-md
          ${isClicking ? 'w-8 h-8' : isPointer ? 'w-14 h-14' : 'w-12 h-12'}
        `}
        style={{
          left: 0,
          top: 0,
          willChange: 'transform',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
          backgroundColor: 'rgba(255, 255, 0, 0.3)', // Yellow glow
        }}
      />
    </>
  );
};

export default CustomCursor;