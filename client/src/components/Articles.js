import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function Articles({ articles }) {

  //// Converts ISO format date to regular looking date
  function dateConverter(date) {
    const regularDate = new Date(date);
    const returnDate = `${regularDate.getFullYear()}-${
      regularDate.getMonth() + 1
    }-${regularDate.getDate()} ${regularDate.getHours()}:${regularDate.getMinutes()}:${regularDate.getSeconds()}`;
    return returnDate;
  }

  //// Function that opens new tab and send data to back-end
  function cardWasClicked(article) {
    window.open(article.url, "_blank");
    fetch("/addSearchedArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })
      .then((req) => req.json())
      .then((data) => {});
  }

  return (
    <Row>
      {articles.map((article, index) => {
        return (
          <Col key={index} xs={4}>
            <Card
              className="m-1 cardStyle"
              onClick={() => cardWasClicked(article)}
            >
              <Card.Img variant="top" src={article.image} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {dateConverter(article.publishedAt)}
                </Card.Subtitle>
                <Card.Text className="truncate-ellipsis">
                  {article.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default Articles;
