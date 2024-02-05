"use client";

import { FiArrowUpRight } from "react-icons/fi";
import { SmoothScroll } from "~/layout/smooth-scroll";
import { PostMeta } from "~/types";
import { Posts } from "../posts/posts";

import { Link } from "~/components/link";
import styles from "./home.module.scss";

type Props = {
  posts: PostMeta[];
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex">
      {children} <FiArrowUpRight size={24} />
    </Link>
  );
}

export function Home({ posts }: Props) {
  return (
    <SmoothScroll className={styles.page}>
      <section className={styles.about}>
        <p>
          EMANUEL LORENZO IS A CREATIVE DEVELOPER FOCUSING ON 3D / INTERACTION / SMOOTH ANIMATIONS.
          <br />
          BASED IN BUENOS AIRES / WORKING REMOTELY WORLDWIDE.
        </p>
        <div className={styles.links}>
          <ExternalLink href="mailto:hello@emalorenzo.com">EMAIL</ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/emanuellorenzo/">LINKEDIN</ExternalLink>
          <ExternalLink href="https://twitter.com/emalorenzo_">TWITTER</ExternalLink>
          <ExternalLink href="https://www.instagram.com/emalorenzo/">INSTAGRAM</ExternalLink>
        </div>
      </section>
      <Posts posts={posts} />
    </SmoothScroll>
  );
}
