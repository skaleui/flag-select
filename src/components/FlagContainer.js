import React from 'react';

import SelectBox from './SelectBox';
import FlagDisplay from './FlagDisplay';

import {
  getContinents,
  getCountriesForContinent
} from '../api/flagSelectorApi';

import '../style/FlagContainer.css';


class FlagContainer extends React.Component {
  constructor(props) {
    super(props);

    console.log("Flagcontainer rendered");
    this.state = {
      continents: [],
      countries:[],
      selectedContinent: "",
      selectedCountries: [],
      showCountrySection: false,
      isContinentSelected: false

    };

    this.countriesSelectBox = "";

    this.initialState = this.state;

    this.setSelectedContinent = this.setSelectedContinent.bind(this);
    this.setSelectedCountries = this.setSelectedCountries.bind(this);
  }

  componentWillMount(){
    console.log("componentWillMount");
    this.setState({
      continents: getContinents()
    });
  }


  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps");
  }


  componentDidMount(nextProps){
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("shouldComponentUpdate");

    return true;
  }

  componentWillUpdate(){
    console.log("componentWillUpdate");
  }

  componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate", prevProps, prevState, this.props, this.state);
    if(prevState && (prevState.selectedContinent !== this.state.selectedContinent)) {
      this.forceUpdate();

    }
  }


  setSelectedContinent(continentName){

    console.log("setSelectedContinent");
    let newCountries = getCountriesForContinent(continentName);

    this.setState({
      selectedContinent: continentName,
      countries: newCountries,
      isContinentSelected: true
    });

    let seltext = document.getElementsByClassName('cont-select');
    if(seltext)
      seltext[0].classList.remove("hide");
  }

  setSelectedCountries(countryName){

    console.log("setSelectedCountries");

    const newCountries = this.state.countries;
    const newSelectedCountries = this.state.selectedCountries;

    newCountries.forEach( obj => {
      if(countryName === obj.name){
        obj.isSelected = true;
        newSelectedCountries.push(obj);
      }

    })

    this.setState({countries: newCountries});

    this.setState({selectedCountries: newSelectedCountries});

    if(this.state.countries.length > 0){
      let flgs = document.getElementsByClassName("section-3")[0];
      if(flgs)
        flgs.classList.remove("hide");
    }

  }

  onClearBtnClick(evt){
    this.setState(this.initialState);

    let conselectbox = document.getElementsByName('continent');
    conselectbox[0].value = '';

    let seltext = document.getElementsByClassName('cont-select');
    seltext[0].classList.add("hide");

    let flgs = document.getElementsByClassName("flag");
    for(let i=0;i<flgs.length;i++) {
      flgs[ i ].remove();
    }

    let flagDisplay = document.getElementsByClassName("section-3")[0];
    if(flagDisplay)
      flagDisplay.classList.add("hide");

  }


  render() {

    const continentSection = (
      <SelectBox
        name="continent"
        stepName="Step 1"
        helpText="Select a continent"
        placeholder="Select a Continent"
        multiselect={false}
        list={this.state.continents}
        selectedTextOnClick={this.setSelectedContinent}
      />
    );


    this.countriesSelectBox = (
      <SelectBox
        name="countries"
        stepName="Step 2"
        helpText="Now, Select a country"
        placeholder="Select a country"
        list={this.state.countries}
        selectedContinent={this.state.selectedContinent}
        selectedCountries={this.setSelectedCountries}
        multiSelect={true}
      />
    );

    const flagsSection = (
      this.state.selectedCountries.map(data => {
        return <FlagDisplay
            key={data.name}
            flag={data.flag}
          />
      })
    );



    return (
      <div className="flag-container">
        <div className="section-1">
          {continentSection}
          <div className="continent-selection">
            <div className="cont-select hide"> You selected</div>
            <div>{this.state.selectedContinent}</div>
          </div>
        </div>
        <div className="select-container section-2">
          {this.state.isContinentSelected && this.countriesSelectBox}
        </div>
        <div className="section-3 hide">
          <h2> Selected Flags </h2>
          {flagsSection}
          <div className="clearfix">
            <button className="clear-button" onClick={(evt) => this.onClearBtnClick(evt)}>Clear flags</button>
          </div>
        </div>



      </div>
    );
  }
}


export default FlagContainer;