import React from 'react';
import { mountComponent, expect, sinon } from '../test_helper';
import Cart from '../../src/components/Cart';
import * as AppConstants from '../../src/helpers/util/constant';
import axios from 'axios';
import MockAdapter  from 'axios-mock-adapter';
import { ROOT_URL } from '../../src/actions';
import * as stubs from '../stubs'

describe('Cart Component', () => {

    it('จะต้องมีที่สำหรับโชว์ productItem', () => {
        const wrapper = mountComponent(<Cart />);
        expect(wrapper.find(`#${AppConstants.ProductItemList}`)).to.have.length(1);
    });

    // it('มี product item ถ้ามี data ใน stock', () => {
    //     let mockRequest = new MockAdapter(axios);
    //     let pageIndex = 1;
    //     let pageSize = 20;
    //     //?pageSize=${pageSize}&pageIndex=${pageIndex}
    //     mockRequest.onGet(`${ROOT_URL}/stock`)
    //         .reply(200, stubs.productItems);
    //     const wrapper = mountComponent(<Cart />);
    //     expect(wrapper.find(`#${AppConstants.ProductItem}`)).to.have.length(1);        
    // });
});