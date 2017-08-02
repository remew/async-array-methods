'use strict';

module.exports = mapAsync;

/**
 * @callback AsyncCallback
 * @param {T} currentValue
 * @param {number} index
 * @param {Array<T>} array
 * @return {Promise<Array<T|Error>>}
 */

/**
 * @param {AsyncCallback} asyncCallback - callback function
 * @param {any} [thisArg] - optional. value to use as `this` in asyncCallback
 */
async function mapAsync(asyncCallback, thisArg = null) {
    // const array = thisArg === null ? this : thisArg;
    const array = this;
    if (thisArg !== null) {
        asyncCallback = asyncCallback.bind(thisArg);
    }
    const ret = [];
    for (let i = 0, len = array.length; i < len; i++) {
        const item = array[i];
        const p = asyncCallback(item, i, array).catch(e => e);
        ret.push(p);
    }
    return await Promise.all(ret);
}

