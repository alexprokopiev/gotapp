import React, { Component } from "react";
import "./app.css";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header/header";
import RandomChar from "../randomChar/randomChar";
import ErrorMessage from "../errorMessage/errorMessage";
import CharacterPage from "../pages/characterPage";
import GotService from "../../services/gotService";
import HousePage from "../pages/housePage";
import BookPage from "../pages/bookPage";
import BooksItem from "../pages/booksItem";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  gotService = new GotService();
  constructor(props) {
    super(props);
    this.state = {
      visibleRandomChar: true,
      error: false,
    };
  }
  onToggleRandomChar = () => {
    this.setState(({ visibleRandomChar }) => ({
      visibleRandomChar: !visibleRandomChar,
    }));
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }
  render() {
    const { visibleRandomChar } = this.state;
    const toggleRandomChar = visibleRandomChar ? <RandomChar /> : null;
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>{toggleRandomChar}</Col>
            </Row>
            <Button
              color="primary"
              className="mb-5"
              onClick={this.onToggleRandomChar}
            >
              Toggle random character
            </Button>
            <Route path="/characters" component={CharacterPage} />
            <Route path="/houses" component={HousePage} />
            <Route path="/books" exact component={BookPage} />
            <Route
              path="/books/:id"
              render={({ match }) => {
                const { id } = match.params;
                return <BooksItem bookId={id} />;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
