import { Command } from 'https://esm.sh/commander'

const program = new Command()
import { create, get } from './list-item/engine.ts'

program
  .name('listItem')
  .description('Utilities to work with list items')
  .version('0.8.0')
  .option('-s, --storage <location>', 'Specify storage')

program
  .command('create')
  .description('Create a list item')
  .argument('<string>', 'Title of list item')
  .action(async (str, options) => {
    const opts = program.opts()
    const storage = await import(opts.storage)

    console.log(storage.create(str))
  })

program
  .command('list')
  .description('List all items')
  .argument('[string]', 'ID of list item')
  .action(async (str, options) => {
    const opts = program.opts()
    const storage = await import(opts.storage)

    console.log(storage.get(str))
  })

program.parse(['', '', ...Deno.args])
