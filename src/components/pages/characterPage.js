import React, { Component } from "react";
import ItemList from "../itemList/itemList";
import ItemDetails, { Field } from "../itemDetails/itemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock/rowBlock";

export default class CharacterPage extends Component {
  gotService = new GotService();
  state = {
    selectedItem: 130,
    error: false,
  };
  onItemSelected = (id) => {
    this.setState({
      selectedItem: id,
    });
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
    const itemList = (
      <ItemList
        getData={this.gotService.getAllCharacters}
        onItemSelected={this.onItemSelected}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );
    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getCharacter}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );
    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
