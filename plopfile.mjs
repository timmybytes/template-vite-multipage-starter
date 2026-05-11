import chalk from 'chalk';

// Templates
const TEMPLATES_DIR = 'src/templates/plop';
const INDEX = `${TEMPLATES_DIR}/index.ts.hbs`;
const COMPONENT = `${TEMPLATES_DIR}/Component/Component.tsx.hbs`;
const HOOK = `${TEMPLATES_DIR}/Hook/Hook.ts.hbs`;
const CONTEXT = `${TEMPLATES_DIR}/Context/Context.tsx.hbs`;
const PAGE_INDEX_HTML = `${TEMPLATES_DIR}/Page/index.html.hbs`;
const PAGE_ENTRY = `${TEMPLATES_DIR}/Page/entry.tsx.hbs`;

const VITE_CONFIG_PATH = 'vite.config.ts';
const NAV_DATA_PATH = 'src/data/navData.tsx';

/** -----------------------------------------------------------------
 * General helpers
 *  --------------------------------------------------------------- */

/** Escape single quotes for generated TypeScript string literals. */
const escapeSingleQuotes = (value) => value.replace(/'/g, "\\'");

/** Ensure generated routes always preserve the trailing slash. */
const getPageRoute = (pageName, plop) => {
  const pageSlug = plop.getHelper('kebabCase')(pageName);
  return `/${pageSlug}/`;
};

/** Find the matching closing brace for the opening brace at openIndex. */
const findMatchingBrace = (source, openIndex) => {
  let depth = 0;

  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];

    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;

    if (depth === 0) {
      return i;
    }
  }

  return -1;
};

/** Find the matching closing bracket for the opening bracket at openIndex. */
const findMatchingBracket = (source, openIndex) => {
  let depth = 0;

  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];

    if (char === '[') depth += 1;
    if (char === ']') depth -= 1;

    if (depth === 0) {
      return i;
    }
  }

  return -1;
};

/** -----------------------------------------------------------------
 * Vite config - For adding generated pages to Rollup inputs
 *  --------------------------------------------------------------- */

/** Inject a new Rollup input entry into vite.config.ts. */
const injectViteInputEntry = (fileContents, pageName, plop) => {
  const pageKey = plop.getHelper('camelCase')(pageName);
  const pageSlug = plop.getHelper('kebabCase')(pageName);
  const newEntry = `    ${pageKey}: path.resolve(ROOT, 'pages/${pageSlug}/index.html'),`;

  if (fileContents.includes(newEntry)) {
    return fileContents;
  }

  const inputLabel = 'input:';
  const inputIndex = fileContents.indexOf(inputLabel);

  if (inputIndex === -1) {
    throw new Error('Could not find "input:" block in vite.config.ts');
  }

  const openBraceIndex = fileContents.indexOf('{', inputIndex);

  if (openBraceIndex === -1) {
    throw new Error('Could not find opening brace for Rollup input block');
  }

  const closeBraceIndex = findMatchingBrace(fileContents, openBraceIndex);

  if (closeBraceIndex === -1) {
    throw new Error('Could not find closing brace for Rollup input block');
  }

  const beforeClose = fileContents.slice(0, closeBraceIndex);
  const afterClose = fileContents.slice(closeBraceIndex);

  const trimmedBeforeClose = beforeClose.replace(/\s*$/, '');
  const updatedBeforeClose = `${trimmedBeforeClose}\n${newEntry}\n  `;

  return `${updatedBeforeClose}${afterClose}`;
};

/** -----------------------------------------------------------------
 * navData - For adding generated pages to navigation data
 *  --------------------------------------------------------------- */

/** Get the actual navData array opening bracket after the assignment. */
const getNavDataOpenBracketIndex = (fileContents) => {
  const navDataIndex = fileContents.indexOf('export const navData');

  if (navDataIndex === -1) {
    throw new Error(
      `Could not find "export const navData" in ${NAV_DATA_PATH}`,
    );
  }

  const assignmentIndex = fileContents.indexOf('=', navDataIndex);

  if (assignmentIndex === -1) {
    throw new Error(`Could not find navData assignment in ${NAV_DATA_PATH}`);
  }

  const openBracketIndex = fileContents.indexOf('[', assignmentIndex);

  if (openBracketIndex === -1) {
    throw new Error(`Could not find opening navData array in ${NAV_DATA_PATH}`);
  }

  return openBracketIndex;
};

/** Get the actual navData array closing bracket. */
const getNavDataCloseBracketIndex = (fileContents) => {
  const openBracketIndex = getNavDataOpenBracketIndex(fileContents);
  const closeBracketIndex = findMatchingBracket(fileContents, openBracketIndex);

  if (closeBracketIndex === -1) {
    throw new Error(`Could not find closing navData array in ${NAV_DATA_PATH}`);
  }

  return closeBracketIndex;
};

/** Get the highest top-level parent order currently in navData. */
const getNextParentOrder = (fileContents) => {
  const navDataOpenIndex = getNavDataOpenBracketIndex(fileContents);
  const navDataCloseIndex = getNavDataCloseBracketIndex(fileContents);
  const navDataBody = fileContents.slice(navDataOpenIndex, navDataCloseIndex);

  const parentOrderMatches = [
    ...navDataBody.matchAll(/^\s{2}\{\n\s{4}order:\s*(\d+),/gm),
  ];

  const maxOrder = parentOrderMatches.reduce((max, match) => {
    return Math.max(max, Number(match[1]));
  }, 0);

  return maxOrder + 1;
};

/** Get the highest subnav order currently in a parent block. */
const getNextSubNavOrder = (parentBlock) => {
  const subNavOrderMatches = [
    ...parentBlock.matchAll(/^\s{6}\{\s*order:\s*(\d+),/gm),
  ];

  const maxOrder = subNavOrderMatches.reduce((max, match) => {
    return Math.max(max, Number(match[1]));
  }, 0);

  return maxOrder + 1;
};

/** Get the full parent block matching a parent order. */
const getParentBlockMatch = (fileContents, parentOrder) => {
  const parentPattern = new RegExp(
    `(^  \\{\\n    order: ${parentOrder},[\\s\\S]*?\\n  \\},)`,
    'm',
  );

  return fileContents.match(parentPattern);
};

/** Build a new ParentNav item for navData. */
const getParentNavEntry = ({ order, name, link }) => {
  return `  {
    order: ${order},
    name: '${escapeSingleQuotes(name)}',
    link: '${link}',
  },`;
};

/** Build a new SubNav item for navData. */
const getSubNavEntry = ({ order, name, link }) => {
  return `      { order: ${order}, name: '${escapeSingleQuotes(name)}', link: '${link}' },`;
};

/** Inject a new top-level ParentNav item into navData. */
const injectParentNavEntry = (fileContents, pageName, navLabel, plop) => {
  const link = getPageRoute(pageName, plop);

  if (fileContents.includes(`link: '${link}'`)) {
    return fileContents;
  }

  const closeBracketIndex = getNavDataCloseBracketIndex(fileContents);

  const order = getNextParentOrder(fileContents);
  const entry = getParentNavEntry({
    order,
    name: navLabel,
    link,
  });

  const beforeClose = fileContents
    .slice(0, closeBracketIndex)
    .replace(/\s*$/, '');
  const afterClose = fileContents.slice(closeBracketIndex);

  return `${beforeClose}\n${entry}\n${afterClose}`;
};

/** Inject a new SubNav item into an existing parent item in navData. */
const injectSubNavEntry = (
  fileContents,
  pageName,
  navLabel,
  parentOrder,
  plop,
) => {
  const link = getPageRoute(pageName, plop);

  if (fileContents.includes(`link: '${link}'`)) {
    return fileContents;
  }

  const parentBlockMatch = getParentBlockMatch(fileContents, parentOrder);

  if (!parentBlockMatch) {
    throw new Error(
      `Could not find parent nav item with order "${parentOrder}" in ${NAV_DATA_PATH}`,
    );
  }

  const parentBlock = parentBlockMatch[1];
  const nextSubNavOrder = getNextSubNavOrder(parentBlock);

  const entry = getSubNavEntry({
    order: nextSubNavOrder,
    name: navLabel,
    link,
  });

  if (!parentBlock.includes('subNav: [')) {
    const updatedParentBlock = parentBlock.replace(
      /\n  \},$/,
      `\n    subNav: [\n${entry}\n    ],\n  },`,
    );

    return fileContents.replace(parentBlock, updatedParentBlock);
  }

  const subNavIndex = parentBlock.indexOf('subNav: [');
  const openBracketIndex = parentBlock.indexOf('[', subNavIndex);
  const closeBracketIndex = findMatchingBracket(parentBlock, openBracketIndex);

  if (closeBracketIndex === -1) {
    throw new Error(
      `Could not find closing subNav array for parent order "${parentOrder}" in ${NAV_DATA_PATH}`,
    );
  }

  const beforeClose = parentBlock
    .slice(0, closeBracketIndex)
    .replace(/\s*$/, '');
  const afterClose = parentBlock.slice(closeBracketIndex);
  const updatedParentBlock = `${beforeClose}\n${entry}\n    ${afterClose}`;

  return fileContents.replace(parentBlock, updatedParentBlock);
};

/** Inject a generated page into navData as either ParentNav or SubNav. */
const injectNavDataEntry = (fileContents, data, plop) => {
  const navLabel = data.navLabel || data.name;

  if (data.navPlacement === 'subNav') {
    return injectSubNavEntry(
      fileContents,
      data.name,
      navLabel,
      Number(data.parentOrder),
      plop,
    );
  }

  return injectParentNavEntry(fileContents, data.name, navLabel, plop);
};

/** -----------------------------------------------------------------
 * Plop generators
 *  --------------------------------------------------------------- */

export default (plop) => {
  plop.setWelcomeMessage('Choose from the options below:');

  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new atomic component',
    prompts: [
      {
        type: 'list',
        name: 'heirarchy',
        message: 'Select a type:',
        choices: [
          { name: 'Atom', value: 'atoms' },
          { name: 'Molecule', value: 'molecules' },
          { name: 'Organism', value: 'organisms' },
          { name: 'Wrapper', value: 'wrappers' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the component:',
      },
    ],
    actions: (data) => {
      if (!data.name) {
        data.name = `${data.heirarchy.slice(0, -1)}${Date.now().toString()}`;
        console.log(
          chalk.yellowBright(
            'No Component name given. Creating randomized naming...',
          ),
        );
        console.log(chalk.greenBright(`Created ${data.name}`));
      }

      const actions = [];

      if (data.name.includes('/')) {
        data.subDirPath = data.name.split('/')[0];
        data.name = data.name.split('/')[1];

        actions.push(
          {
            type: 'add',
            path: 'src/components/{{heirarchy}}/{{subDirPath}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
            templateFile: COMPONENT,
          },
          {
            type: 'add',
            path: 'src/components/{{heirarchy}}/{{subDirPath}}/{{pascalCase name}}/index.ts',
            templateFile: INDEX,
          },
          {
            type: 'add',
            path: 'src/components/{{heirarchy}}/{{subDirPath}}/index.ts',
            skipIfExists: true,
          },
          {
            type: 'append',
            path: 'src/components/{{heirarchy}}/{{subDirPath}}/index.ts',
            template: "export * from './{{pascalCase name}}'",
          },
        );

        if (data.heirarchy === 'wrappers') {
          actions.push({
            type: 'append',
            path: 'src/components/wrappers/index.ts',
            template: "export * from './{{subDirPath}}/{{pascalCase name}}'",
          });
        }
      } else {
        actions.push(
          {
            type: 'add',
            path: 'src/components/{{heirarchy}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
            templateFile: COMPONENT,
          },
          {
            type: 'add',
            path: 'src/components/{{heirarchy}}/{{pascalCase name}}/index.ts',
            templateFile: INDEX,
          },
        );

        if (data.heirarchy === 'wrappers') {
          actions.push({
            type: 'append',
            path: 'src/components/wrappers/index.ts',
            template: "export * from './{{pascalCase name}}'",
          });
        }
      }

      return actions;
    },
  });

  // Page generator
  plop.setGenerator('page', {
    description: 'Create a new page directory and register it in Vite/navData',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the page:',
      },
      {
        type: 'input',
        name: 'navLabel',
        message: 'Enter a nav label:',
        default: (answers) => answers.name,
      },
      {
        type: 'list',
        name: 'navPlacement',
        message: 'Where should this page be added in navData?',
        choices: [
          { name: 'Top-level parent nav item', value: 'parent' },
          { name: 'Subnav item under an existing parent', value: 'subNav' },
        ],
        default: 'subNav',
      },
      {
        type: 'input',
        name: 'parentOrder',
        message: 'Enter the parent nav order to add this page under:',
        when: (answers) => answers.navPlacement === 'subNav',
        validate: (value) => {
          if (!value || Number.isNaN(Number(value))) {
            return 'Enter a valid parent order number.';
          }

          return true;
        },
      },
    ],
    actions: (data) => {
      if (!data.name) {
        data.name = `page-${Date.now().toString()}`;
        data.navLabel = data.name;

        console.log(
          chalk.yellowBright(
            'No Page name given. Creating randomized naming...',
          ),
        );
        console.log(chalk.greenBright(`Created ${data.name}`));
      }

      return [
        {
          type: 'add',
          path: 'pages/{{kebabCase name}}/index.html',
          templateFile: PAGE_INDEX_HTML,
        },
        {
          type: 'add',
          path: 'pages/{{kebabCase name}}/entry.tsx',
          templateFile: PAGE_ENTRY,
        },
        {
          type: 'modify',
          path: VITE_CONFIG_PATH,
          transform: (fileContents) =>
            injectViteInputEntry(fileContents, data.name, plop),
        },
        {
          type: 'modify',
          path: NAV_DATA_PATH,
          transform: (fileContents) =>
            injectNavDataEntry(fileContents, data, plop),
        },
      ];
    },
  });

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a new hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the hook:',
      },
    ],
    actions: (data) => {
      if (!data.name) {
        data.name = `useHook${Date.now().toString()}`;
        console.log(
          chalk.yellowBright(
            'No Hook name given. Creating randomized naming...',
          ),
        );
        console.log(chalk.greenBright(`Created ${data.name}`));
      }

      if (
        !data.name.startsWith('use') ||
        data.name[3] !== data.name[3].toUpperCase()
      ) {
        throw new Error(
          chalk.bgRedBright(
            `"${data.name}" does not follow React Hook naming conventions, e.g., "useName"`,
          ),
        );
      }

      return [
        {
          type: 'add',
          path: 'src/hooks/{{camelCase name}}.ts',
          templateFile: HOOK,
        },
        {
          type: 'append',
          path: 'src/hooks/index.ts',
          template: "export * from './{{camelCase name}}'",
        },
      ];
    },
  });

  // Context generator
  plop.setGenerator('context', {
    description: 'Create a new React context ',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the Context:',
      },
    ],
    actions: (data) => {
      if (!data.name) {
        data.name = `Misc${Date.now().toString()}Context`;
        console.log(
          chalk.yellowBright(
            'No Context name given. Creating randomized naming...',
          ),
        );
        console.log(chalk.greenBright(`Created ${data.name}`));
      }

      if (!data.name.includes('Context')) {
        throw new Error(
          chalk.bgRedBright(
            `"${data.name}" does not follow React Context naming conventions, e.g., "NameContext"`,
          ),
        );
      }

      return [
        {
          type: 'add',
          path: 'src/context/{{titleCase name}}.tsx',
          templateFile: CONTEXT,
        },
      ];
    },
  });
};
