import path from 'path';
import fs from 'fs/promises';

const Home = ({ products }) => (
  <>{console.log(products)}</>
);

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'backend.json');
  const toParse = await fs.readFile(filePath);
  const data = JSON.parse(toParse);

  return {
    props: {
      ...data
    }
  }
};

export default Home;