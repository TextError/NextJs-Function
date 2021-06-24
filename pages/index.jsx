import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

const Home = ({ products }) => (
  <ul>
    { 
      products.map(({ id, title }) => (
        <li key={id}>
          <Link href={`/products/${id}`}>{title}</Link>
        </li>
      )) 
    }
  </ul>
);

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'backend.json');
  const toParse = await fs.readFile(filePath);
  const data = JSON.parse(toParse);

  if(!data) return { redirect: { destination: '/no-data' }};
  if(data.products.length === 0) return { notFound: true }; // returns as 404 page

  return {
    props: {
      ...data
    },
    revalidate: 1,
    // notFound: true
    // redirect: { destination: '/no-data' }
  }
};

export default Home;