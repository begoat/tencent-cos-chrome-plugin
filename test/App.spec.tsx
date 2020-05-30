import React from 'react';
import { mount } from 'enzyme';

import { App } from '../src/App';

describe('RsLogo component test', () => {
  test('should always true', () => {
    expect(true).toBe(true);
  });

  test('should render text correctly', () => {
    const wrapper = mount(<App />);
    const t = wrapper.find('div');
    expect(t.text()).toEqual('123');
  });
});
