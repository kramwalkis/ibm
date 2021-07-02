import "./App.scss";
import { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import SearchCont from "./components/SearchCont";
import Articles from "./components/Articles"

function App() {  
  const scrollRef = useRef();
  const [lastArticleDate, setLastArticleDate] = useState({ date: "" });
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('')  

  async function fetchFromScroll(searchQuery, date) {
    const request = await fetch(
      `https://gnews.io/api/v4/search?q=${searchQuery}&max=10&to=${date.date}&token=f761bc3b88119973046aad53fa4bd099`
    );
    const data = await request.json();
    setLastArticleDate({
      ...{ date: data.articles[data.articles.length - 1].publishedAt },
    });
    setArticles([...articles, ...data.articles.slice(1)]);
  }  
    
  function scrollLogic() {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (Math.floor(scrollTop) + clientHeight === scrollHeight) {
        fetchFromScroll(query, lastArticleDate);
      }
    }
  }

  function runClickLogic(articlesArray, date, query) {
    setQuery(query)
    setLastArticleDate({
      ...{ date: date },
    });
    articlesArray.length === 0
      ? setArticles([]) 
      : setArticles([...articles, ...articlesArray.slice(1)]);
  }

  return (
    <div className="App" onScroll={scrollLogic} ref={scrollRef}>
      <SearchCont runClickLogic={runClickLogic}></SearchCont>      
      <Container className="mt-3 mb-0 pb-0" fluid articles={articles}>
      <Articles articles={articles}></Articles>        
      </Container>
    </div>
  );
}

export default App;
