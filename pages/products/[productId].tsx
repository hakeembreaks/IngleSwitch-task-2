import { GetStaticPaths, GetStaticProps } from 'next';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Button } from '@mui/material';

import { useRouter } from 'next/router';

// This function tells Next.js what paths it should pre-render at build time.
export const getStaticPaths = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

//   const paths = products.map((product: Product) => ({
//     params: { productId: product.id.toString() },
//   }));

//   return { paths, fallback: false };
// };

// the next lines define a constant paths that is an array of objects. Each object contains a params property that is another object with a productId property set to the id of a product in the products array converted to a string. This is used to create the list of static paths to pre-render
const paths = products.map((product: Product) => {
  return {
    params: { productId: product.id.toString() },
  };
});


// The getStaticPaths function returns an object with a paths property set to paths and a fallback property set to false.
return {
  paths,
  fallback: false,
};
};

// This function fetches the data for a single product page at build time using the product ID from the URL path.
export const getStaticProps:  GetStaticProps = async (context) => {
  //const productId = context.params.productId;
  const productId = context.params?.productId; // The function uses the productId from context.params to fetch the product data from the API.

  // const { params } = context;
  // const { productId } = params as { productId: string };
  // const { params } = context; // By extracting the params property from the context object, this code is able to get access to the dynamic parameter values passed in the URL path.
  // const { productId } = params as { productId: string }; // params is an object that contains route parameters specified in the page's file name. For example, if the file name is [productId].js, then params would contain the value of productId parameter that was passed in the URL.

  const res = await fetch('https://fakestoreapi.com/products/' + productId); // sends a request to the Fake Store API with the productId value as a parameter. It returns a response object.
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
  const router = useRouter();


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
