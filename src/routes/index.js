/**
 * Handle server routes
 */
import fs from 'fs'
// import path from 'path'
import logger from '@apis/node-logger'

/*
 * The following commented out lines will be required when ES modules are no longer experimental
 * and the application can run without polyfilling with the 'ESM' package
 */
// eslint-disable-next-line no-underscore-dangle
// const __dirname = path.resolve(
//   // @ts-ignore
//   path.dirname(decodeURI(new URL(import.meta.url).pathname))
// )

const validFileTypes = ['js']

const insertRoutes = async (directory, router) => {
  /* AirBnB strongly recommends not using for...of loops for reasons irrelevant to this
   particular case (there is no lightweight polyfill for them in the browser). The fact is, the
   function of this loop is to produce side-effects asynchronously, and so array iteration
   methods proceed synchronously without error but the routes never make it into the router. */
  for await (const fileName of fs.readdirSync(directory)) {
    // Recurse if directory
    if (fs.lstatSync(`${directory}/${fileName}`).isDirectory()) {
      await insertRoutes(`${directory}/${fileName}`, router)
    } else {
      // Skip itself
      if (fileName === 'index.js' && directory === __dirname) {
        continue
      }
      // skip tests
      if (fileName.includes('test') || fileName.includes('assert')) {
        continue
      }
      // Skip unknown file types
      if (validFileTypes.indexOf(fileName.split('.').pop()) === -1) {
        // ensure only valid file types are included
        continue
      }

      // Import the file.
      const routes = await import(`${directory}/${fileName}`)
      try {
        router(routes.default)
      } catch (e) {
        logger.error(e.message)
      }
      // router(routes)
    }
  }
}

export default async function(app) {
  /**
   * This function is passed DI way to all routes.
   * It's purpose is to dynamically read routes and assign
   * the appropriate handlers to them.
   * @param {Array} routes - routes and their handlers
   * Example (Usage within the route):
   *  const routes = [
   *      ['GET /api/healthcheck', getCheck],
   *      ['POST /api/account/:id/client/:clientid', postClient],
   *  ]
   *  router(routes)
   *
   *  All handlers should return promises to be compatible with the router.
   */

  const router = routes =>
    routes.map(route => {
      const routeDefinition = route.shift()
      const middleware = []
      route.forEach(handler => {
        /* eslint-disable */
        Array.isArray(handler)
          ? handler.forEach(fn =>
            middleware.push(((req, res, next) => fn(req, res, next)))
          )
          : middleware.push(((req, res, next) => handler(req, res, next)))
      })
      const [method, pathString] = routeDefinition.split(' ')
      /* eslint-disable */
      // return app[method.toLowerCase()](path, (req, res, next) => handler(req, res, next))
      return app[method.toLowerCase()](pathString, ...middleware)
    })

  await insertRoutes(__dirname, router)
  /**
   * Catch 404s
   */
  app.get('*', (req, res) => {
    res.sendStatus(404)
  })
}
