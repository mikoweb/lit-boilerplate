import Path from './path.js';
import rollup from 'rollup';
import nodeResolve from './node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import getGlobals from './global-modules.js';

/**
 * @param {string} inputPath
 * @param {string} distFileName
 * @param {Object} [babelOptions]
 * @param {Object} [resolveOptions]
 * @param {Object} [commonjsOptions]
 *
 * @return {Promise}
 */
export default (inputPath, distFileName, babelOptions = {}, resolveOptions = {}, commonjsOptions = {}) => {
    return new Promise((resolve, reject) => {
        rollup.rollup({
            input: inputPath,
            external: Object.keys(getGlobals()),
            plugins: [
                nodeResolve(Object.assign({
                    browser: true
                }, resolveOptions)),
                commonjs(Object.assign({}, commonjsOptions)),
                babel(Object.assign({}, babelOptions))
            ],
        }).then((bundle) => {
            resolve(bundle.write({
                file: Path.bundle('/' + distFileName),
                format: 'iife',
                sourcemap: true,
                globals: getGlobals(),
            }));
        }).catch((e) => {
            reject(e);
        });
    });
};
