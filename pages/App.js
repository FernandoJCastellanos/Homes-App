import React from "react";
import { useQuery, gql } from "@apollo/client";
import { BlockRenderer } from "./components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import Test from "./Test";

const App = () => {
  const query = gql`
    query NewQuery {
      nodeByUri(uri: "/") {
        ... on Page {
          id
          blocks
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  // console.log(data)
  return (
    <div>
      <BlockRenderer blocks={blocks}/>
      <Test />
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            title
          }
        }
      }
    `,
  });

  return {
    props: {
      data
    }
 };
}
export default App;
