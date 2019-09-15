import { withInfo } from "@storybook/addon-info";
import { addDecorator, configure } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /\.stories\.[jt]sx?$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

addDecorator(withInfo);
addDecorator(withKnobs);
