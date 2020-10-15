/* eslint-disable no-unused-vars */
/**
 * @module validation
 * @description This is where you write your validation middlewares for your routes.
 */
import { check, validationResult } from 'express-validator/check'
import { sanitizeQuery } from 'express-validator/filter'
import moment from 'moment'

/**
 * Handles results of express-validator validation chain.
 * Should be added into express middleware chain after all other express-validator functions.
 * Will return an HTTP 400 Bad Request with array of errors found.
 * @export validate
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function validate(req, res, next) {
  const errors = validationResult(req)
  // eslint-disable-next-line no-unused-expressions
  !errors.isEmpty() ? res.status(400).json({ errors: errors.array() }) : next()
}
