/**
 * Factory function for creating a transition style.
 *
 * @param {String} duration Duration of the transition.
 * @param {String} property The property the transition should affect.
 * @param {String} easing Type of easing to apply.
 */
export const transition = (duration = '0.15s', property = 'all', easing = 'ease') => ({
  transition: `${duration} ${property} ${easing}`
});
