import App from '../App';
import { mount  } from 'enzyme';



describe("App Component Tests", () => {
  test('Should be rendered correct', () => {
    const component = mount (<App />)
    const navElement = component.find('nav');
    expect(navElement.length).toEqual(1);
  });
});
