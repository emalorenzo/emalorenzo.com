import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import { Figure } from "~/components/blog/figure";
import { SideNote } from "~/components/blog/sidenote";
import { TableOfContents } from "~/components/blog/toc";
import { Video } from "~/components/blog/video";

type Props = {
  source: MDXRemoteSerializeResult;
};

const Row = ({ children }) => {
  return <div className="w-full flex flex-row space-x-4 relative max-w-[900px]">{children}</div>;
};

const RowItem = ({ children }) => {
  return <div className="flex-1 relative">{children}</div>;
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
        Link,
        Figure,
        SideNote,
        TableOfContents,
        Image: (props) => <Image alt={props.alt} style={{ objectFit: "cover" }} {...props} />,
        Row,
        RowItem,
        Video,
      }}
    />
  );
};
