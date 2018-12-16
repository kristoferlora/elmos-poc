import _ from 'lodash'
import windowResize, {generateBreakpoints} from './actions'

const init = (store) => {
  window.addEventListener('resize', () => {
    const breakpoints = generateBreakpoints(window.innerWidth)
    const currentBreakpoints = store.getState().viewport

    if (!_.isEqual(breakpoints, currentBreakpoints)) {
      store.dispatch(windowResize(breakpoints))
    }
  })
}

export default init
