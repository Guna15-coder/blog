export const blogPosts = [
  {
    id: "3",
    slug: "framer-motion-loading-animations",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    title: "Creating Modern Loading Animations with Framer Motion",
    created_at: "2025-07-05T12:00:00Z",
    content: `
<div className="text-base leading-relaxed space-y-4">

<div>
  Loading animations are more than just visual candy — they're crucial for user experience. A well-crafted loading animation can 
  <span className="font-semibold">reduce perceived wait time by up to 38%</span> and keep users engaged during content fetching.
</div>

<div className="text-3xl font-bold text-primary my-6">
  ✨ Framer Motion: The Animation Powerhouse
</div>

## What is Framer Motion?

<div>
  <span className="font-bold">Framer Motion</span> is a production-ready motion library for React that makes creating smooth, performant animations incredibly simple. Unlike CSS transitions, Framer Motion provides:
</div>

<div>
  <ul className="list-disc ml-6 mt-2 space-y-1">
    <li>🎯 <strong>Declarative API</strong> - Define animations with simple props</li>
    <li>🔄 <strong>Layout Animations</strong> - Animate between different layouts automatically</li>
    <li>🎨 <strong>Gesture Support</strong> - Built-in drag, hover, and tap animations</li>
    <li>⚡ <strong>Performance Optimized</strong> - Uses GPU acceleration and requestAnimationFrame</li>
  </ul>
</div>

<img src="https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=400&fit=crop" alt="Modern animation interface" className="rounded-lg my-6" />

## Complete Loading Animation Component

<div>Here's a comprehensive loading animation component with detailed explanations:</div>

\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from 'lucide-react';

// Modern Loading Animation Component
const LoadingAnimation = () => {
  // State for dynamic loading text
  const [loadingText, setLoadingText] = useState('Initializing');
  // State for progress percentage
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Array of loading messages to cycle through
    const texts = ['Initializing', 'Loading content', 'Preparing animation', 'Almost ready'];
    let textIndex = 0;
    let progressValue = 0;

    // Start immediately with first text and 25% progress
    setLoadingText(texts[0]);
    setProgress(25);

    // Create interval that updates every 800ms
    const interval = setInterval(() => {
      // Calculate next text index (cycles through array)
      textIndex = (textIndex + 1) % texts.length;
      setLoadingText(texts[textIndex]);
      
      // Increment progress by 25%
      progressValue += 25;
      setProgress(Math.min(progressValue, 100));
      
      // Clear interval when progress reaches 100%
      if (progressValue >= 100) {
        clearInterval(interval);
      }
    }, 800);

    // Cleanup function to prevent memory leaks
    return () => clearInterval(interval);
  }, []); // Empty dependency array - runs only once

  return (
    <motion.div
      initial={{ opacity: 0 }}    // Start invisible
      animate={{ opacity: 1 }}    // Fade in
      exit={{ opacity: 0 }}       // Fade out when removed
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50"
    >
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            rotate: 360,           // Full rotation
            scale: [1, 1.2, 1]     // Scale up and down (keyframes)
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-20 h-20 mx-auto"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Code className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-xl font-medium"
        >
          {loadingText}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "25%" }}           // Start at 25%
              animate={{ width: \`\${progress}%\` }}  // Animate to current progress
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            />
          </div>
          <div className="text-gray-400 text-sm mt-2">{progress}%</div>
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              x: [0, 100, -100, 0],    // Move right, left, center
              y: [0, -100, 100, 0],    // Move up, down, center
              opacity: [0, 1, 0]       // Fade in and out
            }}
            transition={{
              duration: 3,             // 3 second animation cycle
              repeat: Infinity,        // Loop forever
              delay: i * 0.5,          // Stagger start times
              ease: "easeInOut"
            }}
            style={{
              left: \`\${50 + (i * 10)}%\`,  // Spread horizontally
              top: \`\${50 + (i * 5)}%\`     // Spread vertically
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
\`\`\`

## Key Animation Concepts Explained

### 1. State Management
<div>
  The component uses <code>useState</code> to manage:
</div>

<ul className="list-disc ml-6 space-y-1 mt-2">
  <li><strong>loadingText</strong> - Current message displayed to user</li>
  <li><strong>progress</strong> - Current progress percentage (0-100)</li>
</ul>

### 2. useEffect Hook
<div>
  The <code>useEffect</code> hook handles the animation lifecycle:
</div>

\`\`\`jsx
useEffect(() => {
  // Animation logic here
  return () => clearInterval(interval); // Cleanup
}, []); // Empty dependency array
\`\`\`

### 3. Motion Components
<div>
  <code>motion.div</code> elements support animation props:
</div>

<ul className="list-disc ml-6 space-y-1 mt-2">
  <li><strong>initial</strong> - Starting state of animation</li>
  <li><strong>animate</strong> - Target state to animate to</li>
  <li><strong>exit</strong> - Animation when component unmounts</li>
  <li><strong>transition</strong> - Controls timing and easing</li>
</ul>

### 4. Keyframe Animations
<div>
  Arrays define multiple animation steps:
</div>

\`\`\`jsx
scale: [1, 1.2, 1]  // Start normal, scale up, back to normal
opacity: [0, 1, 0]  // Fade in, visible, fade out
\`\`\`

### 5. Staggered Effects
<div>
  Create cascading animations with delays:
</div>

\`\`\`jsx
delay: i * 0.5  // Each particle starts 0.5 seconds later
\`\`\`

## Performance Optimization Tips

<ul className="list-disc ml-6 space-y-1 mt-2">
  <li>🎯 <strong>Use transform properties</strong> - scale, rotate, translateX/Y are GPU-accelerated</li>
  <li>🔄 <strong>Avoid layout animations</strong> - Don't animate width, height, or position</li>
  <li>⚡ <strong>Use will-change sparingly</strong> - Only for complex animations</li>
  <li>🎨 <strong>Implement proper cleanup</strong> - Clear intervals and timeouts</li>
  <li>📱 <strong>Respect accessibility</strong> - Check prefers-reduced-motion</li>
</ul>

## Usage in Your App

<div>Here's how to integrate the loading animation:</div>

\`\`\`jsx
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-12"
        >
          <h1>Content Loaded!</h1>
          {/* Your main content here */}
        </motion.div>
      )}
    </div>
  );
};
\`\`\`

## Advanced Animation Patterns

### Skeleton Loading
<div>
  Show content structure while loading:
</div>

\`\`\`jsx
const SkeletonLoader = () => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className="space-y-4"
  >
    <div className="h-4 bg-gray-300 rounded w-3/4" />
    <div className="h-4 bg-gray-300 rounded w-1/2" />
    <div className="h-4 bg-gray-300 rounded w-5/6" />
  </motion.div>
);
\`\`\`

### Morphing Shapes
<div>
  Create dynamic shape transformations:
</div>

\`\`\`jsx
const MorphingLoader = () => (
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      borderRadius: ["20%", "50%", "20%"]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600"
  />
);
\`\`\`

### Wave Animation
<div>
  Create flowing wave effects:
</div>

\`\`\`jsx
const WaveLoader = () => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -20, 0],
          backgroundColor: ["#3b82f6", "#8b5cf6", "#3b82f6"]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.1
        }}
        className="w-2 h-8 bg-blue-500 rounded"
      />
    ))}
  </div>
);
\`\`\`

## Animation Timing Functions

<div>
  Choose the right easing for your animations:
</div>

<ul className="list-disc ml-6 space-y-1 mt-2">
  <li><strong>linear</strong> - Constant speed (good for rotations)</li>
  <li><strong>easeInOut</strong> - Slow start and end (natural feeling)</li>
  <li><strong>easeOut</strong> - Fast start, slow end (good for entrances)</li>
  <li><strong>easeIn</strong> - Slow start, fast end (good for exits)</li>
  <li><strong>anticipate</strong> - Pulls back before moving forward</li>
</ul>

## Final Thoughts

<div>
  <strong>Loading animations</strong> are your chance to make a first impression. With Framer Motion, you can create experiences that feel premium and keep users engaged during wait times.
</div>

<blockquote className="border-l-4 border-primary pl-4 italic my-4">
  "The best loading animations don't just pass time — they build anticipation and create delight."
</blockquote>

<div>
  Start building stunning animations today: <a href="https://www.framer.com/motion/" className="text-blue-600 underline">Framer Motion Documentation →</a>
</div>

</div>
    `,
  },
];