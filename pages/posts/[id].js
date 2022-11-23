import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyle from "../../styles/utils.module.css"

export async function getStaticPaths(){
    const paths = getAllPostIds();

    return{
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }){
    const postData =  await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
  
}


export default function Post({postData}) {
    return (
        <Layout>
            <Head><title>{postData.title}</title></Head>
            <article>
                <h1 className={utilStyle.headingX1}>{postData.title}</h1>
                <div className={utilStyle.lightText}>{postData.date}</div>
                
                {/* ↓危険なhtmlの入れ込み方　サニタイズ等でスクリプトが実行されええないように書く必要がある */}
                <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}} />
            </article>
        </Layout>    
    );
}