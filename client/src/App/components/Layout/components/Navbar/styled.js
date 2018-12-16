// NPM packages
import React from 'react'
import styled from 'styled-components'
import {Menu} from 'semantic-ui-react'

function NavBase(props) {
  return (
    <Menu
      {...props}
      inverted
      borderless
    />
  )
}

export const Nav = styled(NavBase).attrs({
  className: 'nav'
})`
  border-radius: 0 !important;
  flex: 0 0 auto;
  margin: 0 !important;

  .item:first-of-type {
    margin-left: 0 !important;
  }

  .item:last-of-type {
    margin-right: 0 !important;
  }

  &.vertical {
    width: 100% !important;
    position: absolute;
    z-index: 1000;
    top: 48px;
    text-align: right;
  }

  button.ui.button {
    padding-left: 0;
    padding-right: 0;
    border: none;
    background: none;
    color: #FFF;
  }
`
