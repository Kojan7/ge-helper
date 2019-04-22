/* eslint-disable no-mixed-operators */
/* eslint-disable import/prefer-default-export */
/**
 * Generate adjacent tile coord
 * @param {number[]} coord
 * @param {string} position
 * @returns {number[]}
 */
export const tileCoordGen = (coord, position) => {
  switch (position) {
    case 'bottomLeft':
      return [coord[0] + 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)];
    case 'bottomRight':
      return [coord[0] + 1, coord[1] - (coord[0] % 2 ? 1 : 0)];
    case 'bottom':
      return [coord[0] + 2, coord[1]];
    case 'mostBottomLeft':
      return [coord[0] + 2, coord[1] + 1];
    case 'mostBottomRight':
      return [coord[0] + 2, coord[1] - 1];
    case 'left':
      return [coord[0], coord[1] + 1];
    case 'right':
      return [coord[0], coord[1] - 1];
    case 'top':
      return [coord[0] - 2, coord[1]];
    case 'topLeft':
      return [coord[0] - 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)];
    case 'topRight':
      return [coord[0] - 1, coord[1] - (coord[0] % 2 ? 1 : 0)];
    default:
      return coord;
  }
};
