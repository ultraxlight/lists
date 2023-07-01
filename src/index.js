import { Command } from 'https://esm.sh/commander'
import { renderToString } from './list-item/index.ts'

const program = new Command()

program
  .name('listItem')
  .description('Utilities to work with list items')
  .version('0.8.0')
  .option('-s, --storage <location>', 'Specify storage')

program
  .command('create')
  .description('Create a list item')
  .argument('<string>', 'Title of list item')
  .action(async (str) => {
    const opts = program.opts()
    const storage = await import(opts.storage)

    console.log(storage.create(str))
  })

program
  .command('remove')
  .description('Remove a list item')
  .argument('<string>', 'ID of list item')
  .action(async (str) => {
    const opts = program.opts()
    const storage = await import(opts.storage)

    console.log(storage)

    console.log(storage.remove(str))
  })

program
  .command('remove-all')
  .description('Remove all list items')
  .action(async () => {
    const opts = program.opts()
    const storage = await import(opts.storage)

    storage.removeAll()
    console.log(storage.get())
  })

program
  .command('list')
  .description('List all items')
  .argument('[string]', 'ID of list item')
  .option('-f, --format <md|json>', 'Output Format')
  .action(async (str, options) => {
    const opts = program.opts()
    const storage = await import(opts.storage)

    if (options.format && options.format === 'json') {
      console.log(storage.get(str))
    } else {
      console.log(storage.get(str).map(renderToString).join('\n'))
    }
  })

program.parse(['', '', ...Deno.args])
