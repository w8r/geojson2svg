import commonjs from '@rollup/plugin-commonjs';
import noderesolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import {
  name,
  description,
  version,
  main,
  module as moduleName
} from './package.json';

export default [{
  input: './src/index.js',
  output: {
    file: main,
    format: 'umd'
  }
}]