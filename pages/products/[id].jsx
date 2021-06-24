import fs from 'fs/promises';
import path from 'path';

const ProductID = ({ product }) => {

  const { title, description } = product;

  // if(!product) return <p>Loading ....</p>

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
  const { products } = await fetchData();
  const product = products.find((el) => el.id === id);

  if(!product) return { notFound: true };
  return { props: { product }}
};

export const getStaticPaths = async () => {
  const { products } = await fetchData();
  const ids = products.map(el => el.id);
  const arr = ids.map(id => ( { params: { id }} ));
  return {
    paths: arr,
    fallback: false
    // fallback: 'blocking'   // No need for fallback Loading component
  }
};

export default ProductID;
