import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const pckg = require('./package.json');

const root = path.join(__dirname, '..', '..');
const packageName = pckg.name.replace('@', '').replace(/\//g, '-');

const globals = {
  react: 'React',
};

const cjs = [
  {
    input: './src/main.ts',
    output: {
      file: `dist/cjs/${packageName}.js`,
      format: 'cjs',
      sourcemap: 'inline',
    },
    external: [/node_modules/],
    plugins: [
      babel({
        configFile: path.join(root, 'babel.config.json'),
        exclude: 'node_modules/**',
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        babelHelpers: 'runtime',
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
              version: pckg.dependencies['@babel/runtime'],
            },
          ],
        ],
      }),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': 'development',
      }),
    ],
  },
  {
    input: './src/main.ts',
    output: {
      file: `dist/cjs/${packageName}.production.min.js`,
      format: 'cjs',
      sourcemap: true,
    },
    external: [/node_modules/],
    plugins: [
      babel({
        configFile: path.join(root, 'babel.config.json'),
        exclude: 'node_modules/**',
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        babelHelpers: 'runtime',
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
              version: pckg.dependencies['@babel/runtime'],
            },
          ],
        ],
      }),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': 'production',
      }),
      terser(),
    ],
  },
];

const umd = [
  {
    input: './src/main.ts',
    output: {
      file: `dist/umd/${packageName}.js`,
      format: 'umd',
      globals,
      name: 'ReactAnimationHooksCore',
      sourcemap: 'inline',
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        configFile: path.join(root, 'babel.config.json'),
        exclude: 'node_modules/**',
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        babelHelpers: 'bundled',
      }),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': 'development',
      }),
    ],
  },
  {
    input: './src/main.ts',
    output: {
      file: `dist/umd/${packageName}.production.min.js`,
      format: 'umd',
      globals,
      name: 'ReactAnimationHooksCore',
      sourcemap: true,
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        configFile: path.join(root, 'babel.config.json'),
        exclude: 'node_modules/**',
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        babelHelpers: 'bundled',
      }),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': 'production',
      }),
      terser(),
    ],
  },
];

const es = [
  {
    input: './src/main.ts',
    output: {
      file: `dist/es/${packageName}.js`,
      format: 'es',
      sourcemap: true,
    },
    external: [/node_modules/],
    plugins: [
      babel({
        configFile: path.join(root, 'babel.config.json'),
        exclude: 'node_modules/**',
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        babelHelpers: 'runtime',
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
              version: pckg.dependencies['@babel/runtime'],
            },
          ],
        ],
      }),
      resolve(),
      commonjs(),
    ],
  },
];

export default [...cjs, ...umd, ...es];
