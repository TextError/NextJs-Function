import { useEffect, useState } from 'react';

const Todo = ({ isTodo }) => {
  const [todo, setTodo] = useState(isTodo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos/2')
      .then((response) => response.json())
      .then(data => {
        setTodo([ data ]);
        setIsLoading(false);
      });
  }, []);

  if(isLoading) return <p>Loading...</p>;

  return (
    <ul style={{ listStyle: 'none' }}>
      {
        todo.map(({ id, title }) => (
          <li key={id}>
            <strong>userId:</strong> {id}
            <br />
            <strong>title:</strong> {title}
          </li>
        ))
      }
    </ul>
  );
}

export async function getStaticProps() {
  const todo = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json();

  return { 
    props: { isTodo: [todo] },
    revalidate: 10
  };
}

export default Todo;