/* DO NOT USE */
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import {
  create,
  get,
  getAll,
  remove,
  update,
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

// const addFormString = `<form method="post"><input name="title" type="text" aria-label="New Item" minlength="1" required /><button>add</button></form>`
// const html = (content: string) =>
//   `<!DOCTYPE html><html lang="en"><head><title>Ultralight - Lists</title><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="description" content="Lists"></head><body>${content}</body></html>`
// const getDeleteCallback = (
//   id: string
// ) => `fetch('/${id}', { method: 'DELETE' }).then(
//   window.location.redirect('/')
// )`
// const getEditCallback = (
//   id: string,
//   title: string
// ) => `fetch('/${id}?title="${title}"', { method: 'PUT' }).then(
//   window.location.redirect('/')
// )`

// const returnAllResponse = (items) =>
//   new Response(
//   JSON.stringify(items),
//     {
//       headers: {
//         'content-type': 'application/json; charset=utf-8',
//       },
//     }
//   )

const jsonResponse = (obj, opts?) =>
  new Response(
    JSON.stringify(obj),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      ...opts,
    },
  )

const ROUTES: Route[] = [
  {
    path: new URLPattern({ pathname: '/:id' }),
    handler: async ({ req, params = {} }) => {
      const id = params.id
      if (id) {
        const item = get(id)
        if (item) {
          // DELETE
          if (req.method === 'DELETE') {
            remove(id)
            const items = getAll()
            return jsonResponse(items)
          }
          // PUT
          if (req.method === 'PUT') {
            const titleFD = (await req.formData()).get('title')
            const title = new URL(req.url).searchParams.get('title') || titleFD
            update(id, { title })

            const items = getAll()
            return jsonResponse(items)
          }
          // GET
          return jsonResponse(item)
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

        // XXX Should just return the newly created item and a 201 for created
        return jsonResponse(items, { status: 201 })
      }

      const items = getAll()
      console.log({ items })

      // GET ALL
      return jsonResponse(items)
    },
  },
]

export function handler(req: Request): Response {
  console.log(req.method, req.url)

  const url = req.url.replace(
    'https://lists-git-main-ultralight.vercel.app/api/hello',
    '',
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
