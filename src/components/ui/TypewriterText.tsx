import { motion } from 'motion/react';
import { useEffect, useState, type CSSProperties } from 'react';

const CURSOR_COLOR = 'var(--sepia)';

function Cursor() {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 1.1,
        repeat: Infinity,
        times: [0, 0.55, 0.6, 1],
        ease: 'linear',
      }}
      style={{
        display: 'inline-block',
        width: '4px',
        height: '1.1em',
        background: CURSOR_COLOR,
        borderRadius: '2px',
        marginLeft: '4px',
        verticalAlign: 'middle',
        userSelect: 'none',
        flexShrink: 0,
        transform: 'translateY(-0.05em)',
      }}
    />
  );
}

const animatedTexts = new Set<string>();

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = '',
  style = {},
  showCursor = true,
  onComplete,
  skipAnimation = false,
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: CSSProperties;
  showCursor?: boolean;
  onComplete?: () => void;
  skipAnimation?: boolean;
}) {
  const isAlreadyAnimated = animatedTexts.has(text) || skipAnimation;
  const [count, setCount] = useState(isAlreadyAnimated ? text.length : 0);
  const [done, setDone] = useState(isAlreadyAnimated);

  useEffect(() => {
    // Check if we already animated this text in the current memory session (resets on refresh)
    if (isAlreadyAnimated || skipAnimation) {
      if (onComplete) onComplete();
      return;
    }

    setCount(0);
    setDone(false);
    let i = 0;
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
          animatedTexts.add(text);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay * 1000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return (
    <span className={className} style={style}>
      {text.slice(0, count)}
      {showCursor && <Cursor />}
    </span>
  );
}
