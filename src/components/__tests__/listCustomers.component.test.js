


import {ListCustomers} from "../pages/listCustomers.component";
import { shallow } from 'enzyme';



describe("List Customers Page Component", () => {
    test('Should be rendered correct', () => {
        const wrapper = shallow(<ListCustomers />);
        expect(wrapper.find('div')).toEqual({});
        expect(wrapper.find('.table')).toEqual({});
        expect(wrapper.find('.caption')).toEqual({});
    })
});