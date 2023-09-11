import { useQuery, gql } from '@apollo/client';
import client from "client"
import { getDataFromTree, renderToStringWithData } from "@apollo/client/react/ssr";



import { useRouter } from 'next/router';



export default function Page(props){
    console.log(props)
    return (
        <div>
            page
        </div>
    )
}


export const getStaticProps = async () => {
    return {
        props: {},
    }
}


export const getStaticPaths = async () => {

    const query = gql`
        query AllPagesQuery {
            pages {
                nodes {
                    uri
                }
            }
        }
`
    
    const {data} = getDataFromTree(query)

    return {
        props: {
            data
        },
        fallback: true
    }

}


// const {data} = await client.query({
//     query: gql`
//         query AllPagesQuery {
//             pages {
//                 nodes {
//                     uri
//                 }
//             }
//         }
//     `
// });

// return {
//     paths: data.pages.nodes.filter(page => page.uri !== "/").map(page => ({
//         params: {
//             slug: page.uri.substring(1, page.uri.length - 1).split("/")
//         },
//     })),
//     fallback: false,
// }