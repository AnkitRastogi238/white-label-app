const breakpoints = {
    small: 390,
    medium: 768,
    large: 1024,
};

let screenWidth: number;
let currentBreakpoint: keyof typeof breakpoints;
let resizeListener: (this: Window, ev: UIEvent) => any;

/**
 * Initialize the breakpoint based on the current screen width
 */
function initializeBreakpoint() {
    if (typeof window !== 'undefined') {
        screenWidth = window.innerWidth;
        currentBreakpoint = getBreakpoint();
    } else {
        currentBreakpoint = 'small'; // Set a default breakpoint for server-side rendering
    }
}

/**
 * Get the current breakpoint based on the screen width
 * @returns the current breakpoint
 */
function getBreakpoint(): keyof typeof breakpoints {
    if (!screenWidth) {
        return 'small';
    }
    if (screenWidth >= breakpoints.large) {
        return 'large';
    } else if (screenWidth >= breakpoints.medium) {
        return 'medium';
    } else {
        return 'small';
    }
}

/**
 * Add resize event listeners and call the provided callback when the breakpoint changes
 * @param callback - the function to call when the breakpoint changes
 */
function addEventListeners(callback: (breakpoint: keyof typeof breakpoints) => void) {
    if (typeof window !== 'undefined') {
        resizeListener = handleResize.bind(null, callback);
        window.addEventListener('resize', resizeListener);
    }
}

/**
 * Remove the resize event listener
 */
function removeEventListeners() {
    if (typeof window !== 'undefined' && resizeListener) {
        window.removeEventListener('resize', resizeListener);
    }
}

/**
 * Handle the resize event and call the provided callback if the breakpoint changes
 * @param callback - the function to call when the breakpoint changes
 */
function handleResize(callback: (breakpoint: keyof typeof breakpoints) => void) {
    const newScreenWidth = window.innerWidth;
    if (newScreenWidth !== screenWidth) {
        screenWidth = newScreenWidth;
        const newBreakpoint = getBreakpoint();
        if (newBreakpoint !== currentBreakpoint) {
            currentBreakpoint = newBreakpoint;
            callback(newBreakpoint);
        }
    }
}

export {
    breakpoints,
    getBreakpoint,
    addEventListeners,
    removeEventListeners,
    initializeBreakpoint,
    currentBreakpoint,
};
