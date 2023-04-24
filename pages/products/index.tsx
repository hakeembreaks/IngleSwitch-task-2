import { GetServerSideProps } from 'next';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Link from "next/link";

export const getServerSideProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return {
    props: { products }, 
  };
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type Props = {
  products: Product[];
};

const ProductsPage = ({ products }: Props) => {
  const [isPending, setIsPending] = useState(true);

  useEffect(() => { 
    setIsPending(false);
    
  }, []);

  return (
    <Grid container spacing={1}>
    {isPending && <div>Loading....</div>}
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
