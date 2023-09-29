import React from 'react'
import { BlockRenderer } from '../BlockRenderer';
import { gql, useQuery } from '@apollo/client';
import { slugQuery } from 'utils/getQuery';
import { MainMenu } from '../MainMenu';
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks';
import { mapMainMenuItems } from 'utils/mapMainMenuItems';





const Slug = ({url}) => {


    const uri = `${url}/`
    // console.log("uri", uri)


    const { loading, error, data } = useQuery(slugQuery, {
        variables: { uri },
        });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

        // console.log(data)
        const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks) 
        const mainMenuItems = mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems);
        const callToActionLabel= data.acfOptionsMainMenu.mainMenu.callToActionButton.label
        const callToActionDestination = data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri
  return (
    <div>
        <MainMenu
            items={mainMenuItems}
            callToActionLabel={callToActionLabel}
            callToActionDestination={callToActionDestination}
        />
        <BlockRenderer blocks={blocks} />
    </div>
  )
}

export default Slug