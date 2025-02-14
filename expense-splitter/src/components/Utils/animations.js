// jumpy animation used for UX to guide user what to do next
export const jumpyAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -22, 0],
    transition: {
      duration: 1.2,
      repeat: 5.15,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

export const modalAnimation = {
  initial: { opacity: 0, scale: 0.9 }, // Starts slightly smaller and transparent
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  }, // Pops in smoothly
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.15, ease: "easeIn" },
  }, // Fades out when closing
};
