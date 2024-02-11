"use client";

import { useEffect, useState } from "react";
import { useLoaderStore } from "~/store/loader";
import { PostMeta } from "~/types";
import { BootingSecuence } from "./booting-secuence";
import styles from "./initial-loader.module.scss";
import { LoaderManager } from "./loader-manager";

type Props = {
  posts: PostMeta[];
};

export function InitialLoader({ posts }: Props) {
  const [booting, setBooting] = useState(true);
  const [bootingText, setBootingText] = useState(true);
  const setAppReady = useLoaderStore((state) => state.setAppReady);

  const appReady = !booting && !bootingText;

  useEffect(() => {
    if (appReady) {
      setTimeout(() => {
        setAppReady(true);
      }, 1000);
    }
  }, [appReady, setAppReady]);

  return (
    <>
      <LoaderManager
        posts={posts}
        onLoaded={() => {
          setBooting(false);
        }}
      />
      <div className={styles.initialLoader}>
        <BootingSecuence
          visible={!appReady}
          duration={1}
          onComplete={() => {
            setBootingText(false);
          }}
        />
        {/* <BootingBar visible={booting} /> */}
      </div>
    </>
  );
}
