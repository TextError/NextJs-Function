import fs from 'fs/promises';
import path from 'path';

const ProductID = ({ product }) => {

  const { title, description } = product;

  if(!product) return <p>Loading ....</p>

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  )
};

const fetchData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;
  const data = await fetchData();
  const product = data.products.find((product) => product.id === id);

  if(!product) return { notFound: true };
  return { props: { product }}
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'p1' }},
      { params: { id: 'p2' }},
      { params: { id: 'p3' }}
    ],
    fallback: true
    // fallback: 'blocking'   // No need for fallback Loading component
  }
};

export default ProductID;
