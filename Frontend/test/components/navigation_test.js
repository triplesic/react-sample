import React from 'react';
import { mountComponent, expect, sinon } from '../test_helper';
import Navigation from '../../src/components/Navigation';
import * as AppConstants from '../../src/helpers/util/constant';

describe('Navigation Component', () => {

    it('จะต้องมี Navigation', () => {
        const wrapper = mountComponent(<Navigation />);
        expect(wrapper.find(`#${AppConstants.NavigationName}`)).to.have.length(1);
        
    }); 
    it('มีการ default path ไปที่หน้าหลัก(/)', () => {
        const wrapper = mountComponent(<Navigation />);
        expect(wrapper.find(`#${AppConstants.MainLink}`)).to.have.class('active');
    });
    it('มีตระกร้าอยู่ใน navigation', () => {
        const wrapper = mountComponent(<Navigation />);
        expect(wrapper.find(`#${AppConstants.Bucket}`)).to.have.length(1);
    })
    it('มี notify batch เพื่อแสดงจำนวนสิ่งของในตระกร้า', () => {
        const wrapper = mountComponent(<Navigation />);
        expect(wrapper.find(`#${AppConstants.NotifyBatch}`)).to.have.length(1);
    })
});