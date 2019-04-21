// Transition
export const transition = (timing = 0.3) => (
  `
    -webkit-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
    -moz-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
    -ms-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
    -o-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
    transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
  `
);

// Border Radius
export const borderRadius = (radius = 0) => (
  `
    -webkit-border-radius: ${radius};
    -moz-border-radius: ${radius};
    -ms-transition: ${radius};
    -o-border-radius: ${radius};
    border-radius: ${radius};
  `
);

// Box Shadow
export const boxShadow = (shadow = 'none') => (
  `
    -webkit-box-shadow: ${shadow};
    -moz-box-shadow: ${shadow};
    box-shadow: ${shadow};
  `
);
