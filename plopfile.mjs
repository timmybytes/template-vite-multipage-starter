// Plopfile.mjs

import chalk from 'chalk';
// Templates
const TEMPLATES_DIR = 'src/templates/plop';
const INDEX = `${TEMPLATES_DIR}/index.ts.hbs`;
const COMPONENT = `${TEMPLATES_DIR}/Component/Component.tsx.hbs`;
const HOOK = `${TEMPLATES_DIR}/Hook/Hook.ts.hbs`;
const CONTEXT = `${TEMPLATES_DIR}/Context/Context.tsx.hbs`;

// TODO: Hoist checker and helper functions (naming, formatting, etc.) to DRY things up

/**
 * Plop configuration for automating file generation
 * Create generators and user prompts to populate the data object
 * (properties can be manually added to data as well).
 * Pass data to actions to generate files.
 *
 * See more at https://plopjs.com/documentation
 * @param {*} plop
 */
export default plop => {
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
          {
            name: 'Atom',
            value: 'atoms',
          },
          {
            name: 'Molecule',
            value: 'molecules',
          },
          {
            name: 'Organism',
            value: 'organisms',
          },
          {
            name: 'Wrapper',
            value: 'wrappers',
          },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the component:',
      },
    ],
    actions: data => {
      if (!data.name) {
        data.name = `${data.heirarchy.slice(0, -1)}${Date.now().toString()}`;
        console.log(
          chalk.yellowBright(
            `No Component name given. Creating randomized naming...`,
          ),
        );
        console.log(chalk.greenBright(`Created ${data.name}`));
      }

      let actions = [];

      // Create subdirectory structure
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
        // Add new wrapper to wrappers/index.ts exports
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
        // Add new wrapper to wrappers/index.ts exports
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
    actions: data => {
      if (!data.name) {
        data.name = `useHook${Date.now().toString()}`;
        console.log(
          chalk.yellowBright(
            `No Hook name given. Creating randomized naming...`,
          ),
        );
        console.log(chalk.greenBright(`Created ${data.name}`));
      }

      if (
        !data.name.startsWith('use') ||
        data.name[3] != data.name[3].toUpperCase()
      ) {
        throw new Error(
          chalk.bgRedBright(
            `"${data.name}" does not follow React Hook naming conventions, e.g., "useName"`,
          ),
        );
      }

      let actions = [];
      actions.push(
        {
          type: 'add',
          path: 'src/hooks/{{camelCase name}}.ts',
          templateFile: HOOK,
        },
        {
          // Add new hook to hooks/index.ts exports
          type: 'append',
          path: 'src/hooks/index.ts',
          template: "export * from './{{camelCase name}}'",
        },
      );
      return actions;
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
    actions: data => {
      if (!data.name) {
        data.name = `Misc${Date.now().toString()}Context`;
        console.log(
          chalk.yellowBright(
            `No Context name given. Creating randomized naming...`,
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

      let actions = [];
      actions.push({
        type: 'add',
        path: 'src/context/{{titleCase name}}.tsx',
        templateFile: CONTEXT,
      });
      return actions;
    },
  });
};
