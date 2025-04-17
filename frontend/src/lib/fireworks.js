import confetti from "canvas-confetti";

export const launchFireworks = () => {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 100,
      startVelocity: 60,
      gravity: 0.5,
      ticks: 200,
      origin: { x: 0, y: 1 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 100,
      startVelocity: 60,
      gravity: 0.5,
      ticks: 200,
      origin: { x: 1, y: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
