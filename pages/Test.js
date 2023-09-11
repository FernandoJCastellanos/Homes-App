import { gql, useQuery } from '@apollo/client'
import client from 'client'
import React from 'react'

const Test = ({ posts }) => {

console.log(posts)

  // const query = gql`
  // query AllPagesQuery {
  //   pages {
  //     nodes {
  //       title
  //     }
  //   }
  // }
  //   `
  

  // const { loading, error, data } = useQuery(query);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;
  //       console.log(data)

  return (
    <div>Test</div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts
    },
    revalidate: 1
  };
}


export default Test
