import React,{Component} from 'react';
import renderer from 'react-test-renderer';
import FlagContainer from '../../../src/components/FlagContainer';

describe("FlagContainer tests", () => {
  
  let props;
  let flagContainerComp;
  
  const flagContainer = () => {

    debugger;

    if(!flagContainerComp) {
      debugger;
      flagContainerComp = renderer.create(
        <FlagContainer {...props}/>
      );

      return flagContainerComp;
    }
  }

  beforeEach( () => {

    debugger;
    props = {};

    flagContainerComp = undefined;
  });

  it("should render when initialized", () => {

    flagContainer().render();
    expect(true).toBe(true);
  })
  
  
});