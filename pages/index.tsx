
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from "next/link"; // mports the Link component from the Next.js framework, which allows for client-side navigation between pages.
 

// the next line of code defines an asynchronous function called getStaticProps that takes no arguments and is used in Next.js for pre-rendering static pages at build time.
export const getStaticProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products'); // sends a GET request to the API and returns a Response object
  const products = await res.json(); //  extracts the JSON data from the response and stores it in the products variable.

  return {
    props: { products },  // returns an object with a props key, which contains the products data. This makes the products data available to the page component as a prop.
  };
};

// next line defines an interface for a Product object, which has several properties including id, title, price, description, category, and image.
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

// next line defines an interface for the Props object, which includes an array of Product objects called products.
type Props = {
  products: Product[];  
};

const ProductsPage = ({ products }: Props) => {
 

  return (
    <Grid container spacing={1}>
    {products && products.length > 0 ? (
      products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'center',
              margin: '5px', 
              maxWidth: '300px',
              height: '410px',
            }}
          >
             <Link href={{ pathname: `/products/${product.id}` }}>
            <CardMedia
              sx={{ 
                width: '150px',
                objectFit: 'contain',
                height: '150px',
                cursor: 'pointer', 
              }} 
              component="img"
              image={product.image}
              alt={product.title}
            />
            </Link>
            <CardContent>
              <Typography
                sx={{ margin: '10px 0', textAlign: 'center' }}
                variant="h6"
              >
                {product.title} 
              </Typography>
              <Typography
                sx={{ margin: '10px 0', textAlign: 'center' }}
                variant="subtitle1"
                color="textSecondary"
              >
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))
    ) : (
      <></>
    )}
  </Grid>
);
};
export default ProductsPage;
