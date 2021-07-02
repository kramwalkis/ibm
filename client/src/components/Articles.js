import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function Articles({ articles }) {
  function dateConverter(date) {
    const regularDate = new Date(date);
    let returnDate = `${regularDate.getFullYear()}-${
      regularDate.getMonth() + 1
    }-${regularDate.getDate()} ${regularDate.getHours()}:${regularDate.getMinutes()}:${regularDate.getSeconds()}`;
    return returnDate;
  }

  return (
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
  );
}

export default Articles;
