import "./App.scss";
import { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";

function App() {
  const searchRef = useRef();
  const scrollRef = useRef();
  const [lastArticleDate, setLastArticleDate] = useState({ date: "" });
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  function dateConverter(date) {
    const regularDate = new Date(date);
    let returnDate = `${regularDate.getFullYear()}-${
      regularDate.getMonth() + 1
    }-${regularDate.getDate()} ${regularDate.getHours()}:${regularDate.getMinutes()}:${regularDate.getSeconds()}`;
    return returnDate;
  }

  async function fetchFromClick(searchQuery) {
    const request = await fetch(
      `https://gnews.io/api/v4/search?q=${searchQuery}&max=9&token=bb9ec8144134db3ca00bcdd567945b9a`
    );
    const data = await request.json();
    console.log(data);
    setArticles([...data.articles]);
    setLastArticleDate({
      ...{ date: data.articles[data.articles.length - 1].publishedAt },
    });
  }

  async function fetchFromScroll(searchQuery, date) {
    const request = await fetch(
      `https://gnews.io/api/v4/search?q=${searchQuery}&max=10&to=${date.date}&token=bb9ec8144134db3ca00bcdd567945b9a`
    );
    const data = await request.json();
    setLastArticleDate({
      ...{ date: data.articles[data.articles.length - 1].publishedAt },
    });
    setArticles([...articles, ...data.articles.slice(1)]);
  }

  function checkInputValidity(input) {
    const pattern = /^[\w\d\s]+$/;
    return pattern.test(input.trim()) && input.length < 40 ? true : false;
  }

  function showError () {
    console.log('bad input')
  }

  function handleClick(input) {
    checkInputValidity(input) ? fetchFromClick(input) : showError()
  }

  function scrollLogic() {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (Math.floor(scrollTop) + clientHeight === scrollHeight) {
        fetchFromScroll(searchRef.current.value, lastArticleDate);
      }
    }
  }
  return (
    <div className="App" onScroll={scrollLogic} ref={scrollRef}>
      <Form.Text id="inputErrorMsg">
        Search can only contain letters and numbers and be max 40 character long
      </Form.Text>
      <InputGroup>
        <FormControl ref={searchRef} />
        <InputGroup.Append>
          <Button
            onClick={() => handleClick(searchRef.current.value)}
            variant="outline-secondary"
          >
            Button
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Container className="mt-3 mb-0 pb-0" fluid>
        <Row>
          {articles.map((article, index) => {
            return (
              <Col key={index} xs={4}>
                <Card className="m-1">
                  <Card.Img variant="top" src={article.image} />
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {dateConverter(article.publishedAt)}
                    </Card.Subtitle>
                    <Card.Text>{article.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
