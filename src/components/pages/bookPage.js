import React, { Component } from "react";
import ItemList from "../itemList/itemList";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import { withRouter } from "react-router-dom";

class BookPage extends Component {
  gotService = new GotService();
  state = {
    error: false,
  };
  componentDidCatch() {
    this.setState({
      error: true,
    });
  }
  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <ItemList
        getData={this.gotService.getAllBooks}
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        renderItem={(item) => item.name}
      />
    );
  }
}

export default withRouter(BookPage);
