import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Home = () => {
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  // const auth = Boolean(localStorage.getItem("isLoggedIn"));
  // // console.log(auth);

  const quotesData = async () => {
    const quotesUrl = "https://api.quotable.io/random";
    const response = await fetch(quotesUrl);
    const data = await response.json();
    const newData = await { ...data };
    setQuote({ ...newData });
  };

  useEffect(() => {
    quotesData();
  }, []);

  console.log(quote.author);

  const logOutUser = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.removeItem("user");
    // localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0 h-100">
      <Navbar className="p-0 navbar text-white">
        <Navbar.Brand href="/" className="quotes-logo text-white">
          Quotes
        </Navbar.Brand>
        <Nav className="ms-auto logout-button p-0">
          <Nav.Link
            to="/login"
            onClick={logOutUser}
            className="text-white text-center  "
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container
        fluid={true}
        className="p-0 main-con vh-100 d-flex justify-content-center align-items-center"
      >
        <Col
          lg={7}
          size="12"
          md={11}
          className="p-3 d-flex flex-column justify-content-center  mx-auto"
        >
          <div className="card-tem shadow px-5 text-white text-center d-flex flex-column justify-content-center">
            <h1 className="fs-1 fw-bold ">Welcome</h1>
            <p className="fs-2 fw-normal ">
              <FaQuoteLeft />
              <span className="mx-3">{quote.content}</span>
              <FaQuoteRight />
            </p>
            <p className="fs-2 fw-bolder fst-italic ">{quote.author}</p>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default Home;
