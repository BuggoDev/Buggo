# Libraries

### craco

- Allows overriding the CRA configuration without ejecting
- Used to add a module alias to easily import core buggo elements such as icons, colors, layout options, etc. (`@buggo/ui`)

### styled-component

- Framework to apply CSS onto React Components
- Enables dynamic CSS such as string substitution to set width, height, color props etc.
- Avoid using css files for styling, have styles embedded with tsx

```js
// Style a React component

import { TransitionGroup, CSSTransition } from "react-transition-group”;

const StyledTransitionGroup = styled(TransitionGroup)`
  position: relative;
  top: 0;
  left: 0;
`;
```

```js
// Style a standard HTML tag

const ButtonContainer = styled.div`
  height: ${Theme.layout.sideBarButtonHeight};
  background-color: ${Theme.colors.grey2};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
`;
```

# Files

### config/paths.json:

- defines the custom import paths that are used by tsconfig.json and Craco

### src/buggo:

- core front-end elements that will be used repeatedly (ui, icons, etc.)
- created to simplify imports and keep the project clean

```js
// example

import { GearBox, Upvote, Pencil, TrashBin } from "@buggo/icons";
```

### src/buggo/ui.ts:

- Single source of true for everything theme/styling related info

# Adding New `@buggo/XYZ` Paths

- In paths.json, define a key-pair with the key being the import string and the value being the path to the file
- You do NOT need to change aliases.js or tsconfig.json, those will automatically adjust based on whatever is in paths.json

# Modify at Your Own Risk

- tsconfig.json
- .eslintrc.js
  - ESLint configuration file, only adjust if serious linting issue arrises

# Do NOT Touch

- config/aliases.js
  - this file takes the paths from paths.json and passes them to Craco to modify webpack paths
- craco.config.js
  - this file takes the aliases from aliases.js and passes them to webpack
  - only modify if you would like to add some other features to webpack / any other bundled CRA library
