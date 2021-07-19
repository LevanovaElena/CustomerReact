import {ListCustomers} from "../pages/listCustomers.component";
import { shallow,mount } from 'enzyme';
import  * as mockList   from "../../data";

jest.mock('../../services/customers.service', () => {
    const mockResult={total:2,docs:mockList,skip:0,limit:100};
    return {
        getCustomer: (idCustomer) => {
            switch(idCustomer) {
                case '':
                    return Promise.resolve(mockResult)
            }
            return Promise.resolve([])
        }
    }
})



describe("List Customers Page Component", () => {
    let component, nodeDiv,nodeH2;

    // Jest beforeEach()
    beforeEach((()=> component = shallow(<ListCustomers />) ))
    beforeEach((()=> nodeDiv = component.find('div')) )
    beforeEach((()=> nodeH2 = component.find('h2')) )


    test('Should be rendered with State isLoaded=false', () => {
        expect(nodeDiv.length).toEqual(2);
        expect(nodeH2.length).toEqual(1);
        expect(nodeH2.text()).toEqual('Loading...');
    })
    test('Should be rendered with State isLoaded=true and List Length =0', () => {

        jest.mock('../../services/customers.service', () => {
            const mockResult={total:2,docs:mockList,skip:0,limit:100};
            return {
                getCustomer: (idCustomer) => {
                    switch(idCustomer) {
                        case '':
                            return Promise.resolve(mockResult)
                    }
                    return Promise.resolve([])
                }
            }
        })
       const componentGetData=jest.spyOn(ListCustomers.prototype,'getData');

        const componentDidMountSpy = jest.spyOn(ListCustomers.prototype,
            'componentDidMount');

        component = mount(<ListCustomers />);
        expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        expect(componentGetData).toHaveBeenCalledTimes(1);

        //component.instance().getData();
        //expect(component.state().listCustomers.length).toEqual(2)
        expect(nodeDiv.length).toEqual(2);
        expect(nodeH2.length).toEqual(1);
        expect(nodeH2.text()).toEqual('Loading...');
    })
});