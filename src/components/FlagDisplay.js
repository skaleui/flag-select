import React from 'react';
import '../style/flag.css';

class FlagDisplay extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      displayFlags: []
    }



  }

  componentWillMount(){
    this.setState({
      displayFlags: [...this.state.displayFlags, this.props.flag]
    })
  }

  render() {

    const flagsInRow = (
      this.state.displayFlags.map((flag) => {

        return (
            <span className="flagShow">{flag}</span>
        )
      })
    );

    return (
      <div className="flag">
        {flagsInRow}
      </div>

    )
  }
}

export default FlagDisplay;
