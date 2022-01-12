#! /usr/bin/env node

'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('    npx create-my-app app-name');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "git@github.com:Saisree9/create-my-app.git";

try {
    fs.mkdirSync(projectPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
        console.log(err);
    }
    process.exit(1);
}

async function main() {
    try {
        console.log('Setting up local environment...');
        console.log('Loading....')
        execSync('npm install -g @angular/cli');
        console.log('Creating new angular project with provided name.....')
        execSync(`ng new ${projectName}`);
        // console.log('Downloading files...');
        // execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

        process.chdir(projectPath);

        console.log('Installing dependencies...');
        execSync('npm install');

        console.log('Removing useless files');
        execSync('npx rimraf ./.git');
        fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

        console.log('The installation is done, this is ready to use !');

    } catch (error) {
        console.log(error);
    }
}
main();


