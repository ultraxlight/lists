import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import {
  create,
  get,
  getAll,
  remove,
} from 'https://denopkg.com/ultraxlight/storage@main/src/local-storage.ts'
import { renderToHtmlString } from './list-item/render/toHtmlString.ts'

type HandlerArgs = {
  params: Record<string, string | undefined> | undefined
  req: Request
}
type Route = {
  path: URLPattern
  handler: (_: HandlerArgs) => Response
}

const addFormString = `<form method="post"><input name="title" type="text" /><button>add</button></form>`

const ROUTES: Route[] = [
  {
    path: new URLPattern({ pathname: '/:id' }),
    handler: ({ req, params }) => {
      const id = params.id
      if (id) {
        const item = get(id)
        if (item) {
          // DELETE
          if (req.method === 'DELETE') {
            remove(id)
          }
          // GET
          return new Response(renderToHtmlString(item, { wrap: true }), {
            headers: {
              'content-type': 'text/html; charset=utf-8',
            },
          })
        }
        return new Response('Not found (try /)', {
          status: 404,
        })
      }
      return new Response('Not found (try /)', {
        status: 404,
      })
    },
  },
  {
    path: new URLPattern({ pathname: '/' }),
    handler: async ({ req }): Promise<Response> => {
      // CREATE
      if (req.method === 'POST') {
        const titleFD = (await req.formData()).get('title')
        const title = new URL(req.url).searchParams.get('title') || titleFD
        create({ title })
        // XXX - list-item/index should provide typed wrappers for storage.
        // return new Response(JSON.stringify(create({ title })))
        const items = getAll()

        // GET ALL
        // return new Response(JSON.stringify(items))
        return new Response(
          `<ul>${items
            .sort((a, b) => a.title - b.title)
            .map(renderToHtmlString)
            .join('')}</ul>${addFormString}`,
          {
            headers: {
              'content-type': 'text/html; charset=utf-8',
            },
          }
        )
      }

      const items = getAll()

      // GET ALL
      // return new Response(JSON.stringify(items))
      return new Response(
        `<ul>${items.map(renderToHtmlString).join('')}</ul>${addFormString}`,
        {
          headers: {
            'content-type': 'text/html; charset=utf-8',
          },
        }
      )
    },
  },
]

export function handler(req: Request): Response {
  console.log(req.method)

  const matchedRoute = ROUTES.find((r) => r.path.exec(req.url))

  if (matchedRoute) {
    const params = matchedRoute.path.exec(req.url)?.pathname.groups
    return matchedRoute.handler({ req, params })
  }

  return new Response('Not found (try /)', {
    status: 404,
  })
}

console.log('Listening on http://localhost:8000')
// serve(handler)

// export default handler
