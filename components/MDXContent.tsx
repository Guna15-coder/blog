"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import CopyButton from "./CopyButton";

const components = {
  img: (props: any) => (
    <img {...props} className="my-6 rounded-lg w-full object-cover" />
  ),
  pre: (props: any) => <pre {...props} className="relative" />,
  code: (props: any) => (
    <div className="relative group bg-muted p-4 rounded-lg overflow-x-auto">
      <code {...props} />
      <CopyButton text={props.children} />
    </div>
  ),
};

export default function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />;
}
