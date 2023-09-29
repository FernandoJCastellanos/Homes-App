
import { gql, useQuery } from '@apollo/client'
import client from 'client'
import React, { useEffect, useState } from 'react'

const Test = (props) => {

console.log(props)
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
    <div>
      <p>hello</p>
    </div>
  )
}


export async function getStaticProps() {
  const data = "hello"
  return {
    props: { data }
  };
}

export default Test
