import PropTypes from 'prop-types'
import React from 'react'
import {pickRest} from '../lib/utils'

import Icon from './Icon'

// Navbar
export const Navbar = ({children, onDrawer, ...rest}) => (
  <div block='navbar' {...rest}>
    {!!onDrawer &&
      <div block='navbar' elem='menu' onClick={onDrawer}>
        <Icon k='bars' />
      </div>
    }
    <div block='navbar' elem='links'>{children}</div>
  </div>
)

Navbar.propTypes = {
  children: PropTypes.any.isRequired,
  onDrawer: PropTypes.func
}

// Navbar Link
export class NavbarLink extends React.Component {
  static defaultProps = {
    as: 'a'
  }

  static propTypes = {
    active: PropTypes.bool,
    as: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    k: PropTypes.string,
    to: PropTypes.string
  }

  input = null

  handleClick = (ev) => {
    if (ev.target.classList.contains('navbar__link')) {
      this.input.click()
    }
  }

  render() {
    const [ mods, {as, children, k, to, ...rest} ] = pickRest(this.props, ['active'])
    if (as === 'Link') {
      rest.to = to
    } else {
      rest.href = to
    }

    rest.onClick = ev => console.log(ev)

    const As = as
    return (
      <div block='navbar' elem='link' mods={mods} onClick={this.handleClick}>
        <As {...rest} ref={i => { this.input = i }}>{!!k && <Icon k={k} />}{children}</As>
      </div>
    )
  }
}

export default {Navbar, NavbarLink}
