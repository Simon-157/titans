import React, { Component } from "react";
import styles from "./css/styles.css";
import { SECONDARY, TERTIARY } from "../../../defaults";
import SearchBox from "./SearchBox";
import Select from "../../components/Select";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      options: [
        { id: 1, region: "NORTH" },
        { id: 2, region: "SOUTH" },
        { id: 3, region: "EAST" },
        { id: 4, region: "WEST" },
        { id: 5, region: "CENTRAL" },
      ],
    };
  }

  handleSelectChange = (value) => {
    this.setState({ selectedOption: value });
  };

  render() {
    const { options, selectedOption } = this.state;

    return (
      <div className={styles.searchBar}>
        <div className={styles.regionSearch}>
          
          <Select
            className={`${styles.regionSearch__dropdown} ${SECONDARY}`}
            data={options}
            value={selectedOption}
            onChange={this.handleSelectChange}
            labelKey="region"
            valueKey="id"
            // valueIcon="icon"
            placeholder="REGION"
            input={false}
            multiple={false}
          />

          <SearchBox />
        </div>
      </div>
    );
  }
}

export default SearchBar;
