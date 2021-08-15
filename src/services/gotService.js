export default class GotService {
  constructor() {
    this._apiBase = "https://anapioficeandfire.com/api";
  }
  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };
  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  };
  getAllHouses = async () => {
    const res = await this.getResource(`/houses`);
    return res.map(this._transformHouse);
  };
  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  };
  getAllBooks = async () => {
    const res = await this.getResource(`/books`);
    return res.map(this._transformBook);
  };
  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  };
  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  };
  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: char.name ? char.name : "Not available",
      gender: char.gender ? char.gender : "Not available",
      born: char.born ? char.born : "Not available",
      died: char.died ? char.died : "Not available",
      culture: char.culture ? char.culture : "Not available",
    };
  };
  _transformHouse = (house) => {
    return {
      id: this._extractId(house),
      name: house.name ? house.name : "Not available",
      region: house.region ? house.region : "Not available",
      words: house.words ? house.words : "Not available",
      titles: house.titles ? house.titles : "Not available",
      overlord: house.overlord ? house.overlord : "Not available",
      ancestralWeapons: house.ancestralWeapons
        ? house.ancestralWeapons
        : "Not available",
    };
  };
  _transformBook = (book) => {
    return {
      id: this._extractId(book),
      name: book.name ? book.name : "Not available",
      numberOfPages: book.numberOfPages ? book.numberOfPages : "Not available",
      publisher: book.publisher ? book.publisher : "Not available",
      released: book.released ? book.released : "Not available",
    };
  };
}
