"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import CopyButton from "./CopyButton";
import Image from "next/image";
import React from "react";

const components = {
  img: (props: React.ComponentProps<'img'>) => {
    // Only pass valid props to Next.js Image
    const { src = '/file.svg', alt = 'Blog Image', width, height, ...rest } = props;
    return (
      <Image
        src={typeof src === 'string' ? src : '/file.svg'}
        alt={alt}
        width={width ? Number(width) : 800}
        height={height ? Number(height) : 400}
        className="my-6 rounded-lg w-full object-cover"
        {...rest}
      />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre {...props} className="relative" />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <div className="relative group bg-muted p-4 rounded-lg overflow-x-auto">
      <code {...props} />
      <CopyButton text={typeof props.children === 'string' ? props.children : String(props.children ?? '')} />
    </div>
  ),
};

export default function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />;
}
