import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {JSDOM} from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import { mount, shallow } from 'enzyme';
import * as sinon from 'sinon';
import { MemoryRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



function noop() {
  return null;
}
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;


const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document
global.navigator = dom.window.navigator;
const $ = _$(window);

chaiJquery(chai, chai.util, $);
//this version use react-addon-test-utils as React component rendering.
function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
        <Router>
            <ComponentClass {...props} />
        </Router>
    </Provider>
  );
  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

//this version use enzyme as React component rendering.
const mountComponent = (component, state={}) => {
  return mount(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={createStore(reducers, state)}>
        <Router>
            {component}
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export {renderComponent, expect, sinon, mountComponent, shallow};
