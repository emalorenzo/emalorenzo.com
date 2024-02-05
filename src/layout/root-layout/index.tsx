import { Header } from "~/components/header";
import { MiniMap } from "./mini-map";

type Props = {
  children: React.ReactNode;
};

export function RootLayout({ children }: Props) {
  return (
    <div className="app h-screen relative">
      <Header />
      <MiniMap />
      {children}
      {/* <div className={styles.borderRight} /> */}
      {/* <InitialLoader /> */}
    </div>
  );
}
