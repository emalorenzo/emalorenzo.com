import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Figure } from "~/components/blog/figure";
import { SideNote } from "~/components/blog/sidenote";
import { TableOfContents } from "~/components/blog/toc";

type Props = {
  source: MDXRemoteSerializeResult;
};

export const MDX = ({ source }: Props) => {
  return (
    <MDXRemote
      {...source}
      components={{
        //   h1: H1,
        //   h2: H2,
        //   h3: H3,
        //   p: Typography.Paragraph,
        //   blockquote: Typography.Blockquote,
        //   a: Link,
        // Link,
        Figure,
        SideNote,
        TableOfContents,
      }}
    />
  );
};
