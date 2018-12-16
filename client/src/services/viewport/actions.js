export const WINDOW_RESIZE = 'WINDOW_RESIZE'

export const generateBreakpoints = (width) => {
  return {
    small: width < 1024,
    phone: width < 768,
    tablet: width >= 768 && width < 1024,
    desktop: width >= 1024
  }
}

const windowResize = (payload) => {
  return {
    type: WINDOW_RESIZE,
    payload
  }
}

export default windowResize
