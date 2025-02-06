export const jumpyAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0], // Jumpy effect: start at 0, move up to -20, and back to 0
    transition: {
      duration: 3, // Total duration of the animation
      repeat: Infinity, // Loop the animation infinitely
      repeatType: "loop", // Type of repeat
      ease: "easeInOut", // Easing function for smooth animation
    },
  },
};
