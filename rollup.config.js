import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';
import rollupJson from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/AceEditor.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
      },
      {
        file: 'dist/index.min.js',
        format: 'es',
        plugins: [terser()],
      },
    ],
    external: ['ace-builds'],
    plugins: [
      rollupJson(),
      typescript(),
      copy({
        targets: [
          {
            src: [
              'node_modules/ace-builds/src-min-noconflict/*.js',
              '!node_modules/ace-builds/src-min-noconflict/ace.js',
            ],
            dest: 'dist/ace',
          },
        ],
      }),
    ],
  },
  {
    input: 'src/AceEditor.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
