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

const addFormString = `<form method="post"><input name="title" type="text" aria-label="New Item" /><button>add</button></form>`
const html = (content: string) =>
  `<!DOCTYPE html><html lang="en"><head><title>Ultralight - Lists</title></head><body>${content}</body></html>`

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
          return new Response(html(renderToHtmlString(item, { wrap: true })), {
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
          html(
            `<ul>${items
              .sort((a, b) => a.title - b.title)
              .map(renderToHtmlString)
              .join('')}</ul>${addFormString}`
          ),
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
        html(
          `<ul>${items.map(renderToHtmlString).join('')}</ul>${addFormString}`
        ),
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
  console.log(req.method, req.url)

  const url = req.url.replace(
    'https://lists-git-main-ultralight.vercel.app/api/hello',
    ''
  )

  const matchedRoute = ROUTES.find((r) => r.path.exec(url))

  if (matchedRoute) {
    const params = matchedRoute.path.exec(url)?.pathname.groups
    return matchedRoute.handler({ req, params })
  }

  return new Response('Not found (try /)', {
    status: 404,
  })
}

console.log('Listening on http://localhost:8000')
serve(handler)

// export default handler
