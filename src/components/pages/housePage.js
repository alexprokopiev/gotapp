import React, { Component } from "react";
import ItemList from "../itemList/itemList";
import ItemDetails, { Field } from "../itemDetails/itemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock/rowBlock";

export default class HousePage extends Component {
  gotService = new GotService();
  state = {
    selectedItem: 5,
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
        getData={this.gotService.getAllHouses}
        onItemSelected={this.onItemSelected}
        renderItem={(item) => item.name}
      />
    );
    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getHouse}
      >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="overlord" label="Overlord" />
        <Field field="ancestralWeapons" label="AncestralWeapons" />
      </ItemDetails>
    );
    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
