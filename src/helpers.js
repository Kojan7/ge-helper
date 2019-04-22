/* eslint-disable no-mixed-operators */

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

/**
 * Convert seconds to HH:MM:SS
 * @param {number} sec
 * @returns {string}
 */
export const toHHMMSS = (sec) => {
  const hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - (hours * 3600)) / 60);
  let seconds = sec - (hours * 3600) - (minutes * 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Return true if it has 8 tiles in its L+ from
 * @param {number} itemId
 */
export const is8Tiles = itemId => itemId < 11 || (itemId > 20 && itemId < 25);
