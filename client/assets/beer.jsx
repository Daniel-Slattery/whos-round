import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path
        d="M366.39 125.45L86.5 126v336c0 22.09 17.91 40 40 40h200c22.09 0 40-17.91 40-40V125.65l-.11-.2z"
        fill="#95e7ee"
      />
      <Path fill="#fec652" d="M366.5 462V125.65l-.11-.2L86.5 126v336z" />
      <Path
        d="M466.5 211v171c0 22.09-17.91 40-40 40h-60v-40h60V211h-60v-40h60c22.09 0 40 17.91 40 40z"
        fill="#95e7ee"
      />
      <Path
        d="M385.45 81.71c7.61 33.773-27.227 60.794-59.95 44.15v84.43c0 11.04-8.95 20-20 20s-20-8.96-20-20v-40c0-13.81.5-39.29-44-39.29-3.61 0-7.06 1.46-9.56 4.05-9.09 9.4-21.83 15.24-35.94 15.24-13.65 0-26.02-5.47-35.04-14.34-3.23-3.17-7.58-4.95-12.32-4.95-3.81 0-7.29 2.17-8.96 5.59-9.66 19.78-29.73 33.5-53.18 33.7v79.78c-.5 11.26-9.45 20.22-20.5 20.22s-20.5-8.96-20.5-20v-120c0-47.57 42.01-85.44 90.76-79.19C149.91 26.77 176.03 10 206 10c23.7 0 44.99 10.59 59.64 26.97 6.04-3.82 13.2-5.97 20.86-5.97 17.45 0 32.29 11.17 37.75 26.75 8.59-5.76 19.54-8.28 31.09-5.8 14.68 3.14 26.82 15.12 30.11 29.76z"
        fill="#ffe5cb"
      />
      <Path d="M286 451.29c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zM145.5 200.29c-5.523 0-10 4.477-10 10v191c0 5.523 4.477 10 10 10s10-4.477 10-10v-191c0-5.523-4.477-10-10-10zM225.5 200.29c-5.523 0-10 4.477-10 10v191c0 5.523 4.477 10 10 10s10-4.477 10-10v-191c0-5.523-4.477-10-10-10z" />
      <Path d="M126.5 512h200c27.57 0 50-22.43 50-50v-30h50c27.57 0 50-22.43 50-50V211c0-27.57-22.43-50-50-50h-50v-30.259c15.675-11.751 23.125-31.613 18.707-51.224-4.133-18.39-19.313-33.398-37.768-37.345-9.811-2.105-19.692-1.36-28.695 2.063C319.716 30.002 303.862 21 286.5 21c-6.544 0-12.939 1.269-18.852 3.711C250.91 8.922 228.843 0 206 0c-30.216 0-58.396 15.393-75.03 40.579C78.7 37.687 35.5 79.156 35.5 130.29v120c0 16.542 13.682 30 30.5 30 3.689 0 7.224-.671 10.5-1.893V462c0 27.57 22.43 50 50 50zm200-20h-200c-13.036 0-24.152-8.361-28.28-20h147.79c5.523 0 10-4.477 10-10s-4.477-10-10-10H96.5V179.506c22.463-3.391 41.914-17.538 52.14-38.505 2.086 0 3.924.722 5.309 2.081 11.286 11.098 26.22 17.209 42.051 17.209 16.408 0 31.725-6.495 43.135-18.295a3.301 3.301 0 012.365-.995c15.567 0 25.753 3.325 30.277 9.881 3.729 5.405 3.726 12.915 3.723 18.95v40.459c0 13.036 8.361 24.152 20 28.28v162.72c0 5.523 4.477 10 10 10s10-4.477 10-10V238.57c11.639-4.128 20-15.243 20-28.28v-70.464c7.005 1.398 14.154 1.407 21 .007V452h-30.51c-5.523 0-10 4.477-10 10s4.477 9.9 10 9.9h28.79c-4.128 11.639-15.244 20.1-28.28 20.1zm50-271h40v151h-40V221zm50-40c16.542 0 30 13.458 30 30v171c0 16.542-13.458 30-30 30h-50v-20h50c5.523 0 10-4.477 10-10V211c0-5.523-4.477-10-10-10h-50v-20h50zM66 260.29c-5.691 0-10.5-4.58-10.5-10v-120c0-38.596 31.582-69.852 70.407-69.852 3.017 0 6.05.192 9.081.581a10 10 0 009.993-5.026C157.437 33.792 180.818 20 206 20c19.73 0 38.752 8.615 52.187 23.637a9.998 9.998 0 0012.799 1.785C275.559 42.529 280.924 41 286.5 41c12.73 0 24.108 8.061 28.313 20.057a10 10 0 0015.006 4.999c6.816-4.57 15.134-6.107 23.429-4.327 10.8 2.31 20.03 11.428 22.446 22.179 5.692 25.264-20.205 45.988-45.661 33.039a9.999 9.999 0 00-14.534 8.913v84.43c0 5.514-4.486 10-10 10s-10-4.486-10-10v-40.452c.003-7.876.008-19.779-7.261-30.315C279.759 127.232 264.034 121 241.5 121c-6.29 0-12.396 2.589-16.749 7.099-7.602 7.862-17.813 12.191-28.751 12.191-10.553 0-20.507-4.073-28.035-11.477-5.133-5.039-11.996-7.813-19.325-7.813-7.579 0-14.623 4.397-17.946 11.202-8.382 17.164-25.35 27.927-44.28 28.089-5.489.047-9.915 4.51-9.915 10v79.525c-.352 5.889-4.931 10.474-10.499 10.474z" />
    </Svg>
  )
}

export default SvgComponent
