# How to Contribute

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Helpful things](#helpful-things)
- [Creating Issues](#creating-issues)
  - [Bug Issues](#bug-issues)
  - [Feature Issues](#feature-issues)
  - [Assignees](#assignees)
  - [Milestones](#milestones)
  - [Labels](#labels)
- [Developing](#developing)
  - [Initializing](#initializing)
  - [Building](#building)
    - [Bonus for VS Code users](#bonus-for-vs-code-users)
  - [Running, debugging and testing](#running-debugging-and-testing)
    - [Bonus for VS Code users](#bonus-for-vs-code-users-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Helpful things

We're open source! We love contributions! An ordered list of helpful things:

1. Patches with tests
2. Bare patches
3. Failing tests
4. Bug reports
5. Problem statements
6. Feature requests


## Creating Issues
GitHub issues can be treated like a massive, communal todo list. If you notice something wrong, toss an issue in and we'll get to it!

**Put issues into the right milestone if avaliable. Don't create new milestones or labels. Talk to the responsible person on a milestone before adding issues to a milestone that have a due date.**

### Bug Issues
* Mark with the "bug" label
* The following things are helpful
    * js console or node logs
    * contact information of users who experienced this request
* The following things should always be included
    * the steps it would take to reproduce the issue
    * what happened when you followed those steps
    * what you expected to happen that didn't

### Feature Issues
* Should be marked with the "enhancement" label

### Assignees
* Assignees are responsible for completing an issue. Do not assign a person to an issue unless they agree to it. Generally, people should assign themselves.

### Milestones
* If your issue fits into a milestone please add it there. Issues with no milestone are fine – they'll be gone through periodically and assigned.
* Creation of new milestones is by group consensus only. Don't do it on your own.
* A milestone with a due date should have a "responsible person" listed in the description. That doesn't mean that person is the sole person to work on it, just that they're the one responsible for coordinating efforts around that chunk of work.
* → Once a milestone has a due date, only issues okay'd by the responsible person can be added. This ensures that a chunk of work can be delivered by the promised due date.

### Labels
* Issues don't get a "prioritize this!" or "CRITICAL" label unless they really apply. "I want this new feature now" does not qualify as important. Generally, these labels should only be applied by people setting up a batch of work. Abuse these labels and they'll become meaningless.
* Creation of new labels is by group consensus. Don't do it on your own!

Some good ways to make sure it's not missed:
* try to add any appropriate labels.
* If this is a browser bug, add the "browser" label, and prefix your issue title with the browser version and the URL you encountered the problem on. e.g. `IE 9: /wisps/xxx can't click on the search input`
* screenshots are always handy
* If your issue is urgent, there's probably a milestone that it belongs in.

## Developing

* Please follow the styleguide: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
* Optionally, add tests, we'd like to hit 100% code coverage
* Please write meaningful commit messages. Keep them somewhat short and meaningful. Commit messages like “meh”, “fix”, “lol” and so on are useless. Your are writing to your future self and everyone else. It’s important to be able to tell what a commit is all about from its message.

    “Write every commit message like the next person who reads it is an axe-wielding maniac who knows where you live”.

* Thank you for contributing!

### Initializing
For initializing just run:
```
npm install
```
If you'll run only tasks from package.json you'll need no global dependency for developing this project.

### Building
To build project run:
```
npm run build
```
or for watching:
```
npm run build:watch
```

If you are changing folder structure or removing some files run:
```
npm run clean-build
```
or for watching:
```
npm run clean
npm run build:watch
```
#### Bonus for VS Code users
There are defined tasks for build and watching.  
Unfrotunately, due to issues with NPM scripts in VS Code tasks, I can't add clean into build task now, so you have to call it manually
if you're changing folder structure or removing some files.

### Running, debugging and testing
To test project run:
```
npm test
```
or for watching:
```
npm run test:watch
```
#### Bonus for VS Code users
There are defined tasks for test and watching.  
Unfrotunately, due to issues with NPM scripts in VS Code tasks, I recommend running test:watch from command line.

There is also defined config in launch.json to start debugging session while running mocha tests. Just set breapoint in you TypeScript code and launch project.  
I've tried to set it with running mocha in watch mode, but due to issues with output in VS Code now it configured only for one run.
