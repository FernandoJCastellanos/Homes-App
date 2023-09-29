import client from "client";



const handler = async (req, res) => {
    try {
        const {data} = await client.query({
            query: gql`
                query PropertiesQuery {
                    properties{
                    nodes {
                        databaseId
                        title
                        uri
                        featuredImage {
                        node {
                            uri
                            sourceUrl
                        }
                        }
                        propertyFeatures{
                        bathrooms
                        bedrooms
                        hasParking
                        petFriendly
                        price
                        }
                    }
                    }
                }
            `
        })
        return res.status(200).json({
            properties: data,
        })
    }catch(e){
        console.log("error", e);
    }
}
export default handler