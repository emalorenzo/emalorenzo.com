import { MDXRemote } from "next-mdx-remote";

export const MDX = ({ source }) => {
  return (
    <MDXRemote
      {...source}
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        p: Typography.Paragraph,
        blockquote: Typography.Blockquote,
        a: Link,
        Figure,
        SideNote,
        Link,
        TableOfContents,
      }}
    />
  );
};
