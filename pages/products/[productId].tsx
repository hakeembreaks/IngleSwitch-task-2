import { GetServerSideProps} from 'next';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { useRouter } from 'next/router';

// next line exports the getServerSideProps function as a named export. It fetches the data during server-side rendering and returns it as props to the page component.

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context; // By extracting the params property from the context object, this code is able to get access to the dynamic parameter values passed in the URL path.
  const { productId } = params as { productId: string }; // params is an object that contains route parameters specified in the page's file name. For example, if the file name is [productId].js, then params would contain the value of productId parameter that was passed in the URL.

  const res = await fetch("https://fakestoreapi.com/products/" +productId); // sends a request to the Fake Store API with the productId value as a parameter. It returns a response object.
  const product = await res.json();

  return {
    props: { product }, // returns the product data as props to the page component
  };
};

// defines a type Product that describes the structure of product data.
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

//  defines a type Props that specifies the structure of props object passed to the ProductPage component.
type Props = {
  product: Product;
};

const ProductPage = ({ product }: Props) => {
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsPending(false);
  }, []);


  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div>
    {product && (
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h2>{product.category}</h2>
      </div>
    )}
     <Button variant="contained" onClick={handleGoBack}>Go back to product list</Button>
    </div>
  );
};



export default ProductPage;
