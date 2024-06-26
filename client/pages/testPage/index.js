import React, { Component } from 'react';
import Select from '../../components/Select';
import Input from '../../components/Input';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      options: [
        { id: 1, name: 'Option 1', icon: 'path/to/icon1.png' },
        { id: 2, name: 'Option 2', icon: 'path/to/icon2.png' },
        { id: 3, name: 'Option 3', icon: 'path/to/icon3.png' },
      ],
      userName: '',
      userEmail: ''
    };
  }

  handleSelectChange = (value) => {
    this.setState({ selectedOption: value });
  };

  handleInputChange = (value, fieldName) => {
    this.setState({ [fieldName]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', this.state);
    // Further processing or sending data to server
  };

  render() {
    const { options, selectedOption, userName, userEmail } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          className="custom-input"
          placeholder="Enter your name"
          name="userName"
          value={userName}
          onChange={(value) => this.handleInputChange(value, 'userName')}
        />

        <Input
          className="custom-input"
          type="email"
          placeholder="Enter your email"
          name="userEmail"
          value={userEmail}
          onChange={(value) => this.handleInputChange(value, 'userEmail')}
        />

        <Select
          className="custom-select"
          data={options}
          value={selectedOption}
          onChange={this.handleSelectChange}
          labelKey="name"
          valueKey="id"
          valueIcon="icon"
          placeholder="Select an option"
          input={true}
          multiple={false}
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Test;
