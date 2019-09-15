const projectConfigFn = require("../config/webpack.config");

module.exports = ({ config, mode }) => {
    const projectConfig = projectConfigFn({}, { storybook: true });

    const newConfig = {
        ...config,
        module: {
            ...config.module,
            rules: projectConfig.module.rules,
        },
        plugins: [...config.plugins, ...projectConfig.plugins],
        resolve: {
            ...config.resolve,
            ...projectConfig.resolve,
        },
    };

    return newConfig;
};
