import { useEffect, useState } from "react";

import styles from "./toc.module.scss";

export const TableOfContents = () => {
  const [sections, setSections] = useState<any>([]);

  useEffect(() => {
    const elements: HTMLElement[] = Array.from(document.querySelectorAll("h2#contenido+ul>li>a"));
    const allSections = elements.map((element: HTMLElement) => ({
      href: element.getAttribute("href"),
      text: element.textContent,
    }));

    setSections(allSections);

    const mdxGeneratedTOCList = document.querySelector("h2#contenido+ul") as HTMLElement;
    if (mdxGeneratedTOCList) {
      mdxGeneratedTOCList.style.display = "none";
      // mdxGeneratedTOCList.remove();
    }
    const mdxGeneratedTOC = document.querySelector("h2#contenido") as HTMLElement;
    if (mdxGeneratedTOC) {
      mdxGeneratedTOC.style.display = "none";
      // mdxGeneratedTOC.remove();
    }
  }, []);
  return (
    <aside className={styles.wrapper}>
      <ul className={styles.contentList}>
        <h2>Contenido</h2>
        <ul>
          {sections.map(({ href, text }) => (
            <li key={href}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      </ul>
    </aside>
  );
};
