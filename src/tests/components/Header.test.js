import React from 'react';
import { shallow } from 'enzyme';
//import toJSON from 'enzyme-to-json';
//import ReactShallowRenderer from 'react-test-renderer/shallow'; //we have shallow rendering and fulLDOM rendering
import Header from '../../components/Header';

test('should render Header correctly', () => {
    
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
    //expect(wrapper.find('h1').length).toBe(1); //using find we can find something based upon id, class name etc
    //if no of h1 is 1


  
    //const renderer = new ReactShallowRenderer(); //making a new instance using the keyword with what we just imported
    //renderer.render(<Header />);
    //expect(renderer.getRenderOutput()).toMatchSnapshot();

    //console.log(renderer.getRenderOutput());
});