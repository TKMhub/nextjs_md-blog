import Head from "next/head";
import Image from "next/image";
import { Children } from "react";
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link";

const name = "TaKuMi"
export const siteTitle = "Next TaKuMi blog"


function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img 
                        src="/images/Takumi.jpeg"  
                        alt='仮' width={400} 
                        className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
                        />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                    <img 
                    src="/images/Takumi.jpeg"  
                    alt='仮' width={400} 
                    className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
                    />
                <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href='/'>←ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}
export default Layout