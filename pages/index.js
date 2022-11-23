import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from "../components/Layout"
import utilStyle from "../styles/utils.module.css"
import home from "../styles/Home.module.css"
import { getPostsData } from "../lib/post"

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData(); //returnされたid,title,date,thumbnail
  // console.log(allPostsData)

  return {
    props:{
      allPostsData,
    },
  };
}


export default function Home( {allPostsData }) {
  return (
    <Layout home>
      <Head><title>{siteTitle}</title></Head>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <p>自由にシステムを操りたい。そんな自分になれるように日々学習を続けています。</p>
        <h2>エンジニアのNEXTjs勉強ブログ</h2>
        <div className={home.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} 
                  className={styles.thumbnailImage}
                  />
            </Link>
            <Link href={`/posts/${id}`}>
              <p className={utilStyle.boldText}>{title}</p>
            </Link>
            <br/>
            <small className={utilStyle.lightText}>{date}</small>
          </article>
          ))}
        </div>
      </section>
    
    </Layout>
    
  )
}
