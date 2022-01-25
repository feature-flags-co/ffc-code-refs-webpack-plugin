const codeRefs = require('ffc-code-refs-core/build/core');


class CodeRefsPlugin {
    static defaultOptions = {
    };

    constructor(options = {}) {codeRefs
        this.options = { ...CodeRefsPlugin.defaultOptions, ...options };
    }

    apply(compiler) {
        const pluginName = CodeRefsPlugin.name;

        // webpack module instance can be accessed from the compiler object,
        // this ensures that correct version of the module is used
        // (do not require/import the webpack or any symbols from it directly).
        const { webpack } = compiler;
    
        // Compilation object gives us reference to some useful constants.
        const { Compilation } = webpack;
    
        // RawSource is one of the "sources" classes that should be used
        // to represent asset sources in compilation.
        const { RawSource } = webpack.sources;
    
        // Tapping to the "thisCompilation" hook in order to further tap
        // to the compilation process on an earlier stage.
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
          // Tapping to the assets processing pipeline on a specific stage.
          compilation.hooks.processAssets.tapPromise(
            {
              name: pluginName,
    
              // Using one of the later asset processing stages to ensure
              // that all assets were already added to the compilation by other plugins.
              stage: Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS,
            },
            (assets) => {
              return new Promise((resolve, reject) => {
                codeRefs.default().then(staleFeatureFlags => {
                  if (staleFeatureFlags.length > 0) {
                    compilation.errors.push("Stale feature flags found!\n" + JSON.stringify(staleFeatureFlags, null, 4));
                  }
                  
                  resolve();
                });
              });
            }
          );
        });
    }
}

module.exports = { CodeRefsPlugin };