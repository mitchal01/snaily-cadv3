import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class SnailyCAD extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <meta property="og:image" content="/favicon.png" />
          <link rel="preconnect" href="https://code.jquery.com" />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link rel="preload" href="/fonts/Assistant-Regular" as="font" type="font/ttf" />
          <link rel="preload" href="/fonts/Assistant-Medium" as="font" type="font/ttf" />
          <link rel="preload" href="/fonts/Assistant-Bold" as="font" type="font/ttf" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />

          <div id="page-loader">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </body>
      </Html>
    );
  }
}

export default SnailyCAD;
