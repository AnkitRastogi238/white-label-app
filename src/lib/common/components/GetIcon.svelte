<script>
    /**
     * SVG component for displaying vector graphics.
     *  classList - Custom class list for the SVG element.
     *  fill - Fill color of the SVG path.
     *  stroke - Stroke color of the SVG path.
     *  viewBox - Viewbox of the SVG element.
     *  id - Unique identifier for the SVG path.
     *  d - Path data for the SVG path.
     *  strokeWidth - add stroke width.
     */
    export let classList = ''; // Pass custom classList to the SVG element
  
    // Handle other props if needed
    export let fill = 'none';
    export let stroke = 'currentColor';
    export let viewBox = '0 0 24 24';
    export let id = '';
    export let d = 'M5 12h13M12 5l7 7-7 7';
    export let strokeWidth = '2';
  </script>
  
  <svg class={classList} {fill} {stroke} {viewBox} xmlns="http://www.w3.org/2000/svg">
    <path {id} stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} {d}></path>
  </svg>
  