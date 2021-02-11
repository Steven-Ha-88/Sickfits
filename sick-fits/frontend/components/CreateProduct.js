import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables is getting passed in and what types are they. ! notifies as required
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    # assign variables to function
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: "ming",
    price: 3242345,
    description: "dattebayo",
    image: "",
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      // When the mutation fires off and get a successful response,
      // Refetch the the data
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // console.log(inputs);
        // submit the input fields to backend
        const res = await createProduct();
        // console.log(res);
        clearForm();
        // Go to products page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='image'>
          Image
          <input type='file' id='image' name='image' onChange={handleChange} />
        </label>
        <label htmlFor='name'>
          Name
          <input
            required
            type='text'
            id='name'
            name='name'
            placeholder='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='price'
            value={Number(inputs.price)}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='Description'>
          Description
          <textarea
            type='text'
            id='description'
            name='description'
            placeholder='description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type='submit'> Add Product</button>
    </Form>
  );
}
