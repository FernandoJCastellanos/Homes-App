import React from "react";
import { useQuery, gql } from "@apollo/client";
import { BlockRenderer } from "./components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import Test from "./Test";
import { mapMainMenuItems } from "utils/mapMainMenuItems";
import { MainMenu } from "./components/MainMenu";
import { homePageQuery } from "utils/getQuery";
import Head from "next/head";

const App = () => {
  


  const { loading, error, data } = useQuery(homePageQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  const mainMenuItems = mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems);
  const callToActionLabel= data.acfOptionsMainMenu.mainMenu.callToActionButton.label
  const callToActionDestination = data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri
  const seo = data.nodeByUri.seo
  // console.log(seo)



  return (
    <div className="font-body">
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.metaDesc} />
    </Head>
      <MainMenu
        items={mainMenuItems}
        callToActionLabel={callToActionLabel}
        callToActionDestination={callToActionDestination}
      />
      <BlockRenderer blocks={blocks}/>
    </div>
  );
};


export default App;