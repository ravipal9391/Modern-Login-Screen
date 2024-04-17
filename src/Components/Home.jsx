import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Home = () => {
  const [error, setError] = useState("");
  const [quote, setQuote] = useState({});
  const [isLoading, setLoading] = useState(false);
  // const quoteRef = useRef(quote);
  const navigate = useNavigate();
  // const userDetails = JSON.parse(localStorage.getItem("user"));

  // const auth = Boolean(localStorage.getItem("isLoggedIn"));
  // // console.log(auth);

  const quotesData = async () => {
    try {
      setLoading(true);
      const quotesUrl = "https://api.quotable.io/random";
      const response = await fetch(quotesUrl);
      const data = await response.json();
      const newData = await { ...data };
      setQuote(newData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    quotesData();
    // console.log(quote);
  }, []);

  console.log(quote);
  // console.log(quote.author);
  // const quoteContent = quote.content ? quote.content : "Logged In succesfully";
  // const quoteAuthor = quote.author ? quote.author : userDetails.email;
  const displayQuote = (
    <div>
      <p className="fs-2 fw-normal ">
        <FaQuoteLeft />
        <span className="mx-3">{quote.content}</span>
        <FaQuoteRight />
      </p>
      <p className="fs-2 fw-bolder fst-italic ">{quote.author}</p>
    </div>
  );
  const logOutUser = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.removeItem("user");
    // localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <Container fluid={true} className="container-fluid p-0 m-0 h-100">
      <Navbar className="p-0 navbar text-white">
        <Navbar.Brand href="/" className="quotes-logo text-white">
          Quotes
        </Navbar.Brand>
        <Nav className="ms-auto logout-button p-0">
          <Nav.Link
            to="/login"
            onClick={logOutUser}
            className="text-white text-center fw-normal fst-italic"
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container
        fluid={true}
        className="p-0 m-0 main-con vh-100 d-flex justify-content-center align-items-center"
      >
        <Col
          lg={7}
          md={11}
          className="p-3 d-flex flex-column justify-content-center  mx-auto"
        >
          <div className="card-tem shadow px-5 mx-2 text-white text-center d-flex flex-column justify-content-center">
            <h1 className="fs-1 fw-bold ">Welcome</h1>
            {isLoading ? "Loading..." : displayQuote}
          </div>
        </Col>
      </Container>
    </Container>
  );
};

export default Home;
