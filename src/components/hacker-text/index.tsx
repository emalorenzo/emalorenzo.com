import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import styles from "./hacker-text.module.scss";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  active?: boolean;
  iterationsToAdvance?: number;
  speed?: number;
} & JSX.IntrinsicElements["div"];

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomLettersAmount = 3;
const ITERATIONS_TO_ADVANCE = 2;
const ITERATION_SPEED = 15;

export function HackerText({
  children,
  className,
  iterationsToAdvance = ITERATIONS_TO_ADVANCE,
  speed = ITERATION_SPEED,
  active,
  ...props
}: Props) {
  const interval = useRef<any>(null);
  const [text, setText] = useState(children);

  useEffect(() => {
    if (typeof children !== "string") return;

    let iteration = 0;

    if (active) {
      clearInterval(interval.current);

      interval.current = setInterval(() => {
        const newText = children
          .toString()
          .split("")
          .map((letter, index) => {
            if (index < iteration - randomLettersAmount) {
              return letter;
            }
            if (index >= iteration - randomLettersAmount && index < iteration) {
              return letters[Math.floor(Math.random() * 26)];
            }

            return index === 0 ? letters[Math.floor(Math.random() * 26)] : "";
          })
          .join("");

        if (iteration > children.length + randomLettersAmount) {
          clearInterval(interval.current);
        }

        iteration += 1 / iterationsToAdvance;
        setText(newText);
        console.log("settext");
      }, speed);
    }

    return () => {
      if (!active) {
        clearInterval(interval.current);
      }
    };
  }, [active, children, iterationsToAdvance, speed]);

  return (
    <span className={clsx(styles.text, className)} {...props}>
      <span className={styles.animatedText}>{text}</span>
      <span className={styles.spacerText}>{children}</span>
    </span>
  );
}
