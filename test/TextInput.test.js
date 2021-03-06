/* global describe, it */
import React from 'react'
import expect from 'must'
import { mount, shallow } from 'enzyme'
import TextInput from '../web/TextInput'

describe('<TextInput />', () => {
  it('renders as an input', () => {
    const wrapper = shallow(<TextInput name='test' />)
    expect(wrapper.find('.input__component').is('input')).to.be.true()
  })

  it('augments itself', () => {
    const wrapper = shallow(<TextInput as='textarea' name='test' />)
    expect(wrapper.find('.input__component').is('textarea')).to.be.true()
  })

  it('renders classes', () => {
    const wrapper = shallow(<TextInput error name='test' />)
    expect(wrapper.hasClass('input')).to.be.true()
    expect(wrapper.hasClass('input--error')).to.be.true()
  })

  it('renders a message', () => {
    const wrapper = shallow(<TextInput message='Test' name='test' />)
    expect(wrapper.find('.input__message')).to.have.length(1)
    expect(wrapper.find('.input__message').text()).to.equal('Test')
  })

  it('renders the provided default value', () => {
    const wrapper = shallow(<TextInput defaultValue='T' message='Test' name='test' />)
    expect(wrapper.find('.input__component').prop('value')).to.equal('T')
  })

  it('passes extra props down', () => {
    const wrapper = shallow(<TextInput max={1} name='test' />)
    expect(wrapper.find('.input__component').prop('name')).to.equal('test')
    expect(wrapper.find('.input__component').prop('max')).to.equal(1)
  })

  it('calls onchange event', () => {
    let i = 0
    const onChange = () => { i++ }
    const wrapper = shallow(<TextInput onChange={onChange} name='test' />)
    wrapper.find('.input__component').simulate('change', {target: {value: 'test'}})
    expect(i).to.equal(1)
  })

  it('handle focus event with class toggle', () => {
    const wrapper = shallow(<TextInput name='test' />)
    wrapper.find('.input__component').simulate('focus')
    expect(wrapper.hasClass('input--focus')).to.be.true()
  })

  it('handle blur event with class toggle', () => {
    const wrapper = shallow(<TextInput name='test' />)
    wrapper.find('.input__component').simulate('focus')
    wrapper.find('.input__component').simulate('blur')
    expect(wrapper.hasClass('input--focus')).to.be.false()
  })

  it('click on label makes input focused', () => {
    const wrapper = mount(<TextInput label='Test' name='test' />)
    wrapper.find('.input__label').simulate('click')
    expect(document.activeElement.className).to.equal('input__component')
  })
})
