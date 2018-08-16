import React from 'react';
import PropTypes from 'prop-types';
import '../style/SelectBox.css'

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      selectedContinent: "",
      selectedItem: "",
      selectedCountries: []
    }

    this.onInputChange = this.onInputChange.bind(this);

    this.inputClicked = false;

  }
  
  componentDidMount(){
      this.updateData();
  }

  componentDidUpdate(prevProps, prevState){
    console.log("SelectBox - componentDidUpdate",prevProps, prevState, this.props, this.state )
  }

  componentWillReceiveProps(nextProps){

    console.log("SelectBox - componentWillReceiveProps - ", nextProps)
    if(this.props.name === 'countries') {
      if ( this.props.selectedContinent !== this.state.selectedContinent ){
        this.updateData();
        let el = document.getElementsByName("countries")[ 0 ];
        if ( el ) {
          el.value = '';
        }
      }
    }
    return true;
  }

  updateData() {
    let datalist = document.getElementById(this.props.name);
    datalist.innerHTML = '';
    let list = [];
    if ( this.props.list ) {
      this.props.list.forEach((item) => {
        let option = document.createElement('option');
        option.value = item.name;
        datalist.appendChild(option);
        list.push(item);
      });

      this.setState({
        datalist: list,
        selectedContinent: this.props.selectedContinent
      });
    }


  }

  selectedData(){
    var nn = this.props.name;
    let el = document.getElementsByName(nn)[0];
    if(el.value) {
      if(this.props.name === 'continent') {
        this.props.selectedTextOnClick(el.value);
      }
      if(this.props.name === 'countries'){
        this.props.selectedCountries(el.value);
      }
    }
  }

  onInputChange = (e) => {
    e.stopPropagation();

    this.selectedData();
  }

  onSelectClicked = (e) => {


    this.inputClicked = !this.inputClicked; //switch the state.
    console.log('this.inputClicked', this.inputClicked);

  }


  render() {

    console.log('rendering');
    const checkedSelection = (
      <ul id=""className={` ${this.inputClicked ? "hide": "show"}`}>
        <li className="select-checkbox ">My state</li>
        
      </ul>
    );

    const selectionType = (
      <select
        type="search"
        name={this.props.name}
        className="select-box select-checkbox"
        placeholder={this.props.placeholder}
        list={this.props.name}
        multiple={this.props.multiSelect}
        onChange={(evt) => this.onInputChange(evt)}
      />
    );
    return (
      <div>
        <h2>{this.props.stepName}</h2>
        <h3>{this.props.helpText}</h3>
        {selectionType}
        <datalist id={this.props.name}></datalist>
      </div>
    );
  }

}

SelectBox.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string
}

export default SelectBox;