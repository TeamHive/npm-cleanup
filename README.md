# @teamhive/npm-cleanup

This package is a cli tool to automate cleanup and updating of node projects.  Its main features are:
- Auto install and removal of npm packages
- Override and removal of json properties (from package.json, tsconfig.json, etc.)
- Removal of unnecessary files

## Usage
```sh
npm i -g @teamhive/npm-cleanup
npm-cleanup -c ./path-to-npm-cleanup.config.json
```

Your configuration file should be a json object as described below.

## Configuration

Your configuration file should be a json file.  The following are allowed properties:

### `install-packages` and `remove-packages`

The install and remove packages properties are objects that contain arrays on the properties `devDependencies`
and/or `dependencies`.  All dependencies in each array will be installed with the appropriate `--save` or`--save-dev` flag.

For example:
```json
{
    "install-packages": {
        "devDependencies": ["nodemon", "tslint@latest"]
    },
}
```
is equivalent to running
```sh
npm i --save-dev nodemon tslint@latest
```

### json
The `json` property takes an array of objects which each can have the properties `src`, `override`,
and `remove`.

##### `src`
The path to the json file that will be edited

##### `override`
This object will be deep-merged into the existing json object in the source file.  This means existing 
properties that are in the override and in the source will be overwritten while new properties will be added.
**Note:** Existing arrays will simply be replaced with the array in the override.

##### `remove`
npm-cleanup will remove any properties in the `remove` object that are set to `null` from the source object.
See example:

```json
// src.json
{
    "root": {
        "child1": {
            "child2": "value"
        },
        "keep-me": "other-value"
    }
}

// config.json
{
    //...
    "json": {
        "remove": {
            "root": {
                "child1": {
                    "child2": null
                }
            }
        }
    }
}

// edited src.json
{
    "root": {
        "child1": {},
        "keep-me": "other-value"
    }
}

```

### `remove-files`
`remove-files` is an array of strings which are paths to files to be deleted.  If the file exists, `fs.unlink` will be
called to delete it.

### Example Config

```json
{
    "install-packages": {
        "devDependencies": ["nodemon", "tslint@latest"]
    },
    "remove-packages": {
        "dependencies": ["express"]
    },
    "json": [{
            "src": "./package.json",
            "override": {
                "scripts": {
                    "build": "tsc",
                }
            }
        },
        {
            "src": "./tsconfig.json",
            "override": {
                "compilerOptions": {
                    "noUnusedLocals": true,
                    "noUnusedParameters": true,
                    "incremental": true
                }
            }
        },
        {
            "src": "./tslint.json",
            "remove": {
                "rules": {
                    "no-unused-variable": null
                }
            }
        }
    ],
    "remove-files": ["gulpfile.js", "unwanted-file.ts"]
}
```

### Distribution
```
npm pack
npm version (major|minor|patch)
npm publish
```

_Note: This will also automatically push changes and tags post-publish_
