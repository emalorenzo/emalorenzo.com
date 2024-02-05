"use client";

import NextLink, { LinkProps } from "next/link";
import { forwardRef, useMemo } from "react";

import { useNavigation } from "~/hooks/useNavigation";
import { NavigationOptions } from "~/store/loader";

type Props = LinkProps<{}> & {
  children: React.ReactNode;
  className?: string;
  navigationOptions?: NavigationOptions;
} & NavigationOptions &
  JSX.IntrinsicElements["a"] &
  JSX.IntrinsicElements["button"];

export const Link = forwardRef(
  ({ href, children, navigationOptions, ...props }: Props, ref: React.Ref<any>) => {
    const navigateTo = useNavigation();

    const attributes = { ref, ...props };

    const handleClick = (e: any) => {
      e.preventDefault();
      navigateTo(href as string, navigationOptions);
    };

    const isProtocol = useMemo(
      () => href?.toString().startsWith("mailto:") || href?.toString().startsWith("tel:"),
      [href]
    );

    const isExternal = useMemo(() => href?.toString().startsWith("http"), [href]);

    if (isProtocol || isExternal) {
      return (
        <a {...attributes} href={href.toString()} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <NextLink href={href} onClick={handleClick} {...attributes}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
