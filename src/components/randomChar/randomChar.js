import React, { Component } from "react";
import "./randomChar.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <>
      <h4>Random Character: {name ? name : "Not available"}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender ? gender : "Not available"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born ? born : "Not available"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died ? died : "Not available"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture ? culture : "Not available"}</span>
        </li>
      </ul>
    </>
  );
};

export default class RandomChar extends Component {
  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  };
  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  onError = () => {
    this.setState({ error: true, loading: false });
  };
  updateChar = () => {
    const id = Math.floor(Math.random() * 1400 + 25);
    this.gotService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 15000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <div className="random-block rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}
