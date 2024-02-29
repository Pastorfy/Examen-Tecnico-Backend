import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// import config  from 'configuraciones';


// const methodGet='';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1234/api/publicaciones`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log('jsonData',jsonData)
        setData(jsonData);
        // setIsLoading(false);
      } catch (error) {
        console.log(error)
        // setError(error.message);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
          {
            data.map(item => ( <li key={item.IDPublicacion}>{item.Titulo}</li> ))
          }
        </Card.Body>
      </Card>
    </>
  )
}

export default App
