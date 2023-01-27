#!/usr/bin/env node

import { Command } from 'commander'
import { calculate } from './calculate'

const program = new Command()

program
  .version('1.0.0')
  .arguments('<expression>')
  .action((expression) => {
    console.log(`${expression} = ${calculate(expression)}`)
  })

program.parse()
