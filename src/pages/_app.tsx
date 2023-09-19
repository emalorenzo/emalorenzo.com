import { Selector } from "~/components/selector";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <h1>App</h1>
      <Selector />
      <Component {...pageProps} />
    </div>
  );
}
