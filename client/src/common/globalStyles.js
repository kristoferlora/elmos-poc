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
    ${mixins.darkRebase}
  }

  div.center-absolute {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`
