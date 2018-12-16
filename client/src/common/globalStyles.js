import {injectGlobal, css} from 'styled-components'

import colors from './colors'

function rebaseMixin(
  rebase03,
  rebase02,
  rebase01,
  rebase00,
  rebase0,
  rebase1
) {
  return css`
    background-color:${rebase03};
    color:${rebase0};
    * {
      color:${rebase0};
    }
    h1,h2,h3,h4,h5,h6 {
      color:${rebase1};
      border-color: ${rebase0};
    }
    a, a:active, a:visited {
      color: ${rebase1};
    }
    div.ui.segment {
      background-color: ${rebase02} !important;
    }

    div.ui.segment > h1,h2,h3,h4,h5,h6 {
        color: ${colors.blue} !important;
    }
  `
}

const mixins = {
  darkRebase: rebaseMixin(
    colors.base03,
    colors.base02,
    colors.base01,
    colors.base00,
    colors.base0,
    colors.yellow,
    colors.base2,
    colors.base3
  ),
  lightRebase: rebaseMixin(
    colors.base3,
    colors.base2,
    colors.base1,
    colors.base0,
    colors.base00,
    colors.base01,
    colors.base02,
    colors.base03
  )
}

injectGlobal`
  html,
  body,
  #root,
  .app {
    height: 100vh;
  }


  .app {
    display: flex;
    flex-direction: column;
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }

  body {
    font-size: 16px;
    ${mixins.darkRebase}
    font-family: 'Roboto', sans-serif;
  }

  h1,h2,h3,h4,h5,h6, button {
    font-family: 'Catamaran', sans-serif;
  }

  div.center-absolute {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  .ui.modal {
    .header, .content {
      background-color: ${colors.base03};
    }
  }

  .ui.modal>.header {
    color: ${colors.blue};
  }

  label {
    color: ${colors.base3} !important;
  }

  table {
    p {
      color ${colors.base0};
    }
  }

  .ui.header .sub.header {
    color: ${colors.base3};
  }

  p {
    color: ${colors.base3};
  }

  p > span {
    color: ${colors.base0};
  }

  .ui.yellow.message {
    padding: 0;
    color: #b58105;
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    p {
      color: #b58105;
    }
  }
`
