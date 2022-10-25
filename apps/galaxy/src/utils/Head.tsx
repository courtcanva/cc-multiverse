import { ReactNode } from "react";
import NextHead from "next/head";

interface HeadProps {
  children: ReactNode;
  title?: string;
}

// pass title value to set the head title， e.g. In 404 page, write <PageTitle title="404"></PageTitle>
const Head = ({ children, title }: HeadProps) => {
  const headName = `${title} | CourtCanva`;
  return (
    <>
      {title && (
        <NextHead>
          <title>{headName}</title>
          <meta name="twitter:title" content={headName} />
          <meta property="og:title" content={headName} />
        </NextHead>
      )}
      {children}
    </>
  );
};

export default Head;
