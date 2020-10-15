/**
 * @module errors
 * @description This module takes in a string and turns it into an object with a key 'error' and a
 * value of the string passed in.
 */

/**
 * takes in a string and returns an object with the string as the value and the key as 'error'
 * @param {string} message
 * @returns {{error: *}}
 */
const createErrorMessage = message => ({ error: message })

export default createErrorMessage
