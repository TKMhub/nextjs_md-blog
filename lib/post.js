import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getPostsData(){
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8")

        const matterResult = matter(fileContents);

        //idとデータを返す
        return{
            id,
            ...matterResult.data,
        };  
    });
    return allPostData;
}

//getStticPathでreturnで使うpathを取得する。
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileNames) => {
        return {
            params: {
                id: fileNames.replace(/\.md$/ , ""),

            },
        };
    });
}

//idに基づいてブログ投稿用のデータを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return{
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}