import { useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function SearchCont({ runClickLogic }) {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  function handleClick(input) {
    checkInputValidity(input) ? noErrorsOnClick(input) : handleError();
  }

  function handleError() {
    document.getElementById("inputErrorMsg").style.display = "block";
    runClickLogic([], "");
  }

  function checkInputValidity(input) {
    const pattern = /^[\w\d\s]+$/;
    return pattern.test(input.trim()) && input.length < 40 ? true : false;
  }

  function sendInputDataToDb(input) {
    let data = {
      query: input,
    };
    fetch("/addSearchQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function noErrorsOnClick(input) {
    document.getElementById("inputErrorMsg").style.display = "none";
    sendInputDataToDb(input);
    fetchFromClick(input);
  }

  async function fetchFromClick(searchQuery) {
    const request = await fetch(
      `https://gnews.io/api/v4/search?q=${searchQuery}&max=9&token=${process.env.REACT_APP_GNEWS_KEY}`
    );
    const data = await request.json();
    runClickLogic(
      data.articles,
      {
        date: data.articles[data.articles.length - 1].publishedAt,
      },
      searchRef.current.value
    );
  }
  return (
    <div className="searchCont mt-3">
      <Form.Text id="inputErrorMsg">
        Search can only contain letters and numbers and be max 40 character long
      </Form.Text>
      <InputGroup>
        <FormControl className="rounded" ref={searchRef}/>
        <InputGroup.Append >
          <Button            
            onClick={() => handleClick(searchRef.current.value)}
            variant="primary"
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default SearchCont;
