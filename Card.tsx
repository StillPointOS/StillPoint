@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 28, 25, 23;
  --background-start: 250, 250, 249;
  --background-end: 240, 244, 255;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
    160deg,
    rgb(var(--background-start)) 0%,
    rgb(var(--background-end)) 100%
  );
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: #4366ef33;
  color: #2536d1;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #c2d2fc; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: #4366ef; }

/* Prose-like headings */
.font-display { font-family: 'Playfair Display', Georgia, serif; }

/* Glass card */
.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, #4366ef 0%, #2536d1 50%, #232c86 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-gold {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animated gradient bg */
.animated-bg {
  background: linear-gradient(
    -45deg,
    #f0f4fe,
    #e8edff,
    #f5f5f4,
    #fff7ed
  );
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Pulsing dot */
.pulse-dot::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  margin-right: 6px;
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.3); }
}

/* Loading skeleton */
.skeleton {
  background: linear-gradient(90deg, #e7e5e4 25%, #d6d3d1 50%, #e7e5e4 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Range input styling */
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 99px;
  background: #e7e5e4;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #4366ef;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(67, 102, 239, 0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 16px rgba(67, 102, 239, 0.5);
}

input[type="range"]::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #4366ef;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(67, 102, 239, 0.4);
}

/* Focus ring */
*:focus-visible {
  outline: 2px solid #4366ef;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Transition utility */
.transition-all-smooth {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

