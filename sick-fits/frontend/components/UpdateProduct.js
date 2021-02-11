import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. we need to get the existing product
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  // 2. we need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // 2.5 Create some state for the form inputs
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
  console.log(data);
  if (loading) return <p>Loading...</p>;

  // 3. we need the form to handle updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log("HERE", res);
        // console.log(inputs);
        // submit the input fields to backend
        // TODO: handle submit!!
        // const res = await createProduct();
        // console.log(res);
        // clearForm();
        // // Go to products page
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        // });
      }}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
      <button type='submit'>Update Product</button>
    </Form>
  );
}
