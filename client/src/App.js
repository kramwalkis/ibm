import "./App.scss";
import { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const searchRef = useRef();
  const string = "";
  const [lastArticleDate, setLastArticleDate] = useState({ date: string });
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  
  async function fetchFromClick(searchQuery) {
    const request = await fetch(
      `https://gnews.io/api/v4/search?q=${searchQuery}&max=9&&token=f761bc3b88119973046aad53fa4bd099`
    );
    const data = await request.json();
    console.log(data);
    setArticles([...data.articles])
    setLastArticleDate({
      ...{ date: data.articles[data.articles.length - 1].publishedAt },
    });
  }

  function logArticles () {
    console.log(articles);
  }
  return (
    <div className="App">
      <InputGroup>
        <FormControl ref={searchRef} />
        <InputGroup.Append>
          <Button
            onClick={() => fetchFromClick(searchRef.current.value)}
            variant="outline-secondary"
          >
            Button
          </Button>
          <Button onClick={logArticles} >log articles</Button>
        </InputGroup.Append>
      </InputGroup>
      {/* <h1>{lastArticleDate.date}</h1> */}
    </div>
  );
}

export default App;
