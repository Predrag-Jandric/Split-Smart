// jumpy animation used for UX to guide user what to do next
export const jumpyAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -22, 0],
    transition: {
      duration: 1.8,
      repeat: 4.15,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};
