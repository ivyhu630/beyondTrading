import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Beyond Trading</title>
        <meta name="description" content="Beyond Trading Welcome page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Beyond Trading!</h1>
        <p className={styles.description}>Get started by log in</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ivyhu630"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Ivy Hu
          <span className={styles.logo}>
            <Image
              src="/GitHub-Mark-32px.png"
              alt="Github Logo"
              width={32}
              height={32}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
