import Head from 'next/head';
import { NotionRenderer } from 'react-notion';

export async function getStaticProps() {
  const pageId = process.env.NOTION_PAGE_ID;
  const domain = process.env.NOTION_API_WORKER_DOMAIN;
  const token = process.env.NOTION_API_TOKEN;

  const url = `https://${domain}/v1/page/${pageId}`;
  const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await fetch(url, options);
  const data = await response.json();
  const blockMap = response.ok ? data : false;

  return { props: { blockMap }, revalidate: 1 };
}

const ResumePage = ({ blockMap }) => {
  const title = process.env.NEXT_PUBLIC_META_TITLE ?? 'Resume';
  const description = process.env.NEXT_PUBLIC_META_DESCRIPTION ?? '...';
  const url = process.env.NEXT_PUBLIC_META_URL;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {url && <meta property="og:image" content={`${url}/thumbnail.png`} /> }
        {url && <meta property="og:url" content={url} /> }
        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <>
        {blockMap ? (
          <NotionRenderer blockMap={blockMap} />
        ) : (
          <main>
            <h1 style={{ fontFamily: 'monospace', textAlign: 'center' }}>
              Ohoh.. sorry, no resume found 😔
            </h1>
          </main>
        )}
      </>
      {/* react-notion overrides and additions */}
      <style>{`
      html,
      body {
        margin: 0;
      }

      main {
        box-sizing: border-box;
        max-width: 768px;
        margin: 0 auto;
        padding: 10vh 30px 20vh;
      }

      @media(max-width: 640px) {
        main {
          padding: 10vh 5% 20vh;
        }
      }

      .notion-h1:first-of-type {
        margin-bottom: 8px;
        font-size: 40px;
        font-weight: 700;
      }

      .notion-h2 {
        font-size: 1.875em;
        margin-top: 1.4em;
      }

      .notion-h2 > .notion-yellow_background {
        margin: 0 -1em;
        padding: 0 1em;
      }

      .notion-list li {
        padding: 3px 0;
      }
    `}</style>
    </>
  );
};

export default ResumePage;
