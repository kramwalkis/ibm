import "./App.scss";
import Button from "react-bootstrap/Button";


function App() {
  
  

  const fetchItems = async () => {
    const data = await fetch("http://localhost:4000/testdata");
    const items = await data.json();
   console.log(items);
   
  };
  return (
    <div>
      Hello from IBM task
      <Button onClick={fetchItems} variant="danger">IBM</Button>      
    </div>
  );
}

export default App;
