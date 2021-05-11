import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

Enzyme.configure({ //Enzyme.configure can take all sorts of attributes, we are going to pass in as first and only argument an object and n this object we can specify various configuration properties
    adapter: new Adapter()
});

DotEnv.config({ path: '.env.test' });
