import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { PostMeta } from "~/types";

const root = process.cwd();

export const listFiles = (url: string) => {
  return fs.readdirSync(path.join(root, "public/", url));
};

export const getMDX = async (url: string) => {
  const source = fs.readFileSync(path.join(root, "public/", url), "utf8");

  const { data, content } = matter(source);
  const mdxSource: MDXRemoteSerializeResult = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [[remarkToc, { heading: "Contenido" }]],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behaviour: "wrap" }]],
    },
  });

  return {
    mdxSource,
    frontMatter: data as PostMeta,
  };
};

export const getPostsMetadata = async () => {
  const files = await listFiles("posts");

  // get all posts contents
  const getAllPosts = files.map((file) => getMDX(`posts/${file}`));
  const posts = await Promise.all(getAllPosts);

  // use filename as slug
  const getSlug = (file: string) => {
    const fileName = file.replace(".mdx", "");
    return `${fileName}`;
  };

  const postsMetadata = posts.map((post, i) => ({
    ...post.frontMatter,
    slug: getSlug(files[i]),
  }));

  return postsMetadata;
};
