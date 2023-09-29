import { gql, useQuery } from '@apollo/client';


export const homePageQuery = gql`
    query homePageQuery {
    nodeByUri(uri: "/") {
        ... on Page {
        id
        blocks
        seo {
            title
            metaDesc
        }
        }
    }
    acfOptionsMainMenu {
        mainMenu {
        callToActionButton {
            label
            destination {
            ... on Page {
                uri
            }
            }
        }
        menuItems {
            menuItem {
            destination{
                ... on Page {
                uri
                }
            }
            label
            }
            items {
            destination{
                ... on Page {
                uri
                }
            }
            label
            }
        }
        }
    }
    }
`;


export const slugQuery = gql`
    query slugQuery($uri: String!) {
        nodeByUri(uri: $uri) {
            ... on Page {
                id
                title
                blocks
                seo {
                    title
                    metaDesc
                }
            }

            ... on Property {
                id
                title
                blocks
                seo {
                    title
                    metaDesc
                }
            }

        }
        acfOptionsMainMenu {
            mainMenu {
            callToActionButton {
                label
                destination {
                ... on Page {
                    uri
                }
                }
            }
            menuItems {
                menuItem {
                destination{
                    ... on Page {
                    uri
                    }
                }
                label
                }
                items {
                destination{
                    ... on Page {
                    uri
                    }
                }
                label
                }
            }
            }
        }
    }
`




export const propertyQuery = gql`
    query PropertiesQuery ($pageNum: Int!) {
        properties(where: {offsetPagination: {size: 3, offset: $pageNum}}){
        pageInfo {
            offsetPagination {
                total
            }
        }
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