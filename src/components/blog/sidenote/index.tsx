import clsx from "clsx";
import { FiAlertTriangle, FiEdit } from "react-icons/fi";

import styles from "./sidenote.module.scss";

type Props = JSX.IntrinsicElements["aside"] & {
  variant?: "lecture" | "material" | "disclaimer";
  title?: string;
};

export const SideNote = ({ children, variant = "lecture", title, ...props }: Props) => {
  const bg = {
    lecture: "bg-violet-800",
    material: "bg-violet-800",
    disclaimer: "bg-zinc-900",
  }[variant];

  const iconBg = {
    lecture: "bg-violet-900",
    material: "bg-violet-900",
    disclaimer: "bg-zinc-800",
  }[variant];

  const iconColor = {
    lecture: "text-violet-300",
    material: "text-violet-300",
    disclaimer: "text-zinc-300",
  }[variant];

  const Icon = {
    lecture: FiEdit,
    material: FiEdit,
    disclaimer: FiAlertTriangle,
  }[variant];

  const linkColor = {
    lecture: "text-purple-200",
    material: "text-purple-200",
    disclaimer: "text-violet-300",
  }[variant];

  return (
    <aside className={clsx(styles.wrapper, bg, linkColor)} {...props}>
      <div
        className={clsx(
          "rounded-full p-4 w-fit absolute left-[-16px] top-[-16px]",
          iconBg,
          iconColor
        )}
      >
        <Icon size={24} />
      </div>
      {title && <h3>{title}</h3>}
      {children}
    </aside>
  );
};
