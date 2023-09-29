
import { gql, useQuery } from '@apollo/client';
import { Results } from '../Results';
import { Pagination } from './Pagination';
import { useRouter } from 'next/router';
import queryString from "query-string"
import { useEffect, useState } from 'react';
import { Filters } from './Filters';

// import { propertyQuery } from 'utils/getQuery';

export const PropertySearch = () => {

    const router = useRouter()

    const [pageNum, setPageNum] = useState(0)
    const page = parseInt(((pageNum || 1) - 1) * 3)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [hasParking, setHasParking] = useState(null)
    const [petFriendly, setPetFriendly] = useState(null)

// console.log(minPrice, maxPrice, hasParking, petFriendly)
    const filters = {}
// console.log(filters)
// if there is data append to filters
    if(petFriendly === "true"){
        filters.petFriendly = true;
    }
    if(hasParking === "true"){
        filters.hasParking = true;
    }
    if(minPrice){
        filters.minPrice = parseInt(minPrice);
    }
    if(maxPrice){
        filters.maxPrice = parseInt(maxPrice);
    }

// empty let
    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

// if there is data drop to Graphql
    if (filters.hasParking) {
      hasParkingFilter = `
      {
        key: "has_parking"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.petFriendly) {
        petFriendlyFilter = `
      {
        key: "pet_friendly"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.minPrice) {
      minPriceFilter = `
      {
        key: "price"
        compare: GREATER_THAN_OR_EQUAL_TO
        value: "${filters.minPrice}"
        type: NUMERIC
      },
      `;
    }
    if (filters.maxPrice) {
      maxPriceFilter = `
      {
        key: "price"
        compare: LESS_THAN_OR_EQUAL_TO
        value: "${filters.maxPrice}"
        type: NUMERIC
      }
      `;
    }


// GraphQL query
    const propertyQuery = gql`
        query PropertiesQuery {
            properties(where: {offsetPagination: {size: 3, offset: ${page}}
            metaQuery: {
                relation: AND
                metaArray: [
                    ${petFriendlyFilter}
                    ${hasParkingFilter}
                    ${minPriceFilter}
                    ${maxPriceFilter}
                ]
            }
        }){
            pageInfo {
                offsetPagination {
                    total
                }
            }
            nodes {
                databaseId
                title
                uri
                seo {
                    title
                    metaDesc
                }
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

// function to set data states from url
    useEffect(() => {
        const {page, minPrice, maxPrice, hasParking, petFriendly} = queryString.parse(window.location.search)
        const pageStringify = JSON.stringify({page: parseInt(page || "1")})
        setPageNum(parseInt(page))
        setMinPrice(minPrice) 
        setMaxPrice(maxPrice)
        setHasParking(hasParking)
        setPetFriendly(petFriendly)
    },[])

    // console.log(minPrice)


// function to query GraphQl
    const { loading, error, data } = useQuery(propertyQuery, {
        variables: { page },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    const properties = data.properties.nodes
    const total = data.properties.pageInfo.offsetPagination.total
    const pageSize = 3;
    // console.log(total)


// function set url on page clicks
    const handlePageClick = async (pageNumber) => {
        const {
            petFriendly,
            hasParking,
            minPrice,
            maxPrice,
        } = queryString.parse(window.location.search);
        await router.push(`${router.query.slug.join("/")}?page=${pageNumber}&petFriendly=${petFriendly === "true"}&hasParking=${hasParking === "true"}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        null, {
            shallow: true, 
        })
    }


// function to search filters, drill up data and set to url
    const handleSearch = async ({petFriendly, hasParking, minPrice, maxPrice}) => {
        // console.log(petFriendly, hasParking, minPrice, maxPrice)
        // setPageNum2(minPrice)

        await router.push(`${router.query.slug.join("/")}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        null, {
            shallow: true, 
        })
    }

    return (
        <div>
            <Filters onSearch={handleSearch} />
            <Results properties={properties}/>
            <Pagination
                handlePageClick={handlePageClick}
                totalPages={Math.ceil(total / pageSize )}

            />
        </div>
    )
}
