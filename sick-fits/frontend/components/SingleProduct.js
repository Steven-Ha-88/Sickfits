import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--max-width);
  justify-content: center;
  align-items: center;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  // console.log({ data, loading, error });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const {
    Product: { name, description, price, photo },
  } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {name}</title>
      </Head>
      <img src={photo.image.publicUrlTransformed} alt={photo.image.altText} />
      <div className='details'>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyles>
  );
}
