import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { perPage } from "../config";
import Product from "./Product";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  // returns the data, any errors and if its currently loading
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  // starts from loading state to either data or error state.
  // no need to add a callback as its is reactive
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error.message</p>;
  return (
    <div>
      <ProductList>
        {data.allProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ProductList>
    </div>
  );
}

// Important note:
// mod5vid20 14:45 initialState render happens on the server. data is then sent along with the html
// client rehydrates the data. doesnt hit the api twice. apollo restores initialState from cache.
// console.log already has the data in the cache from the initial render
// sssr react has to render on the server then rehydrate and update itself
// on the client
