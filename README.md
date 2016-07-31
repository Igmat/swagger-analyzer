# swagger-analyzer 
> Analyzes swagger (OpenAPI) specification.

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is it?](#what-is-it)
- [Why I have to use it?](#why-i-have-to-use-it)
  - [If you don't want](#if-you-dont-want)
  - [If you do want](#if-you-do-want)
- [Installation (Coming soon)](#installation-coming-soon)
- [Usage (Coming soon)](#usage-coming-soon)
- [Examples (Coming soon)](#examples-coming-soon)
- [Changelog](#changelog)
- [How to Contribute](#how-to-contribute)
- [How to Make Pull Request](#how-to-make-pull-request)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is it?
It is library created by huge fan of [Swagger (OpenAPI) Specification](http://swagger.io/).  
I believe that this spec is not only about documenting projects but has a great
potentional in code generating, which will save a lot of time for developers.  
This library will provide an easy and highly extensible way for creating high quality code-generators using next features:
- grouping [operations](http://swagger.io/specification/#operationObject) for controllers on Backend(BE) and services on Frontend(FE) in order to avoid generating one fat file for API client:
  - by fist tag in it;
  - by convention for operationId in it;
  - by your custom selector;
- grouping [definitions](http://swagger.io/specification/#definitionsObject) in namespaces for both BE and FE:
  - by convention for its name;
  - by its appearance in [operations](http://swagger.io/specification/#operationObject)(if they are grouped);
  - by your custom selector;
- detecting inline-enums + their duplicates and inserting them in namespaces with definitions(if they are grouped):
  - by convention for its name;
  - by its appearance in [operations](http://swagger.io/specification/#operationObject)(if they are grouped);
  - by its appearance in [definitions](http://swagger.io/specification/#definitionsObject)(if they are grouped);
  - by its appearance in [operations](http://swagger.io/specification/#operationObject) and [definitions](http://swagger.io/specification/#definitionsObject);
  - by your custom selector;
- grouping [operations](http://swagger.io/specification/#operationObject), [definitions](http://swagger.io/specification/#definitionsObject) and inline-enums
in components:
  - by [operations](http://swagger.io/specification/#operationObject) groups;
  - by [definitions](http://swagger.io/specification/#definitionsObject) namespaces;
  - by your custom selector;
- using different strategies for grouping in components:
  - with putting all related objects in component in order to make it self-contained (so generated code will be more safe to edit);
  - with defining some objects as dependencies if it is present in more than 1 component (so generated code will be more clean);
  - with your custom strategy;
- generating objects for further BE mocking with human-readable response:
  - for [response object](http://swagger.io/specification/#responseObject):
    - by using its examples;
    - by using convention for its examples;
  - for [schema object](http://swagger.io/specification/#schemaObject):
    - by using properties' format;
    - by using properties' examples;
    - by using convention for properties' examples;
    - by detecting patterns in properties' name;
  - by your custom strategies for: [paths](http://swagger.io/specification/#pathItemObject), [operations](http://swagger.io/specification/#operationObject),
  [response object](http://swagger.io/specification/#responseObject) and [schema object](http://swagger.io/specification/#schemaObject);
  - by combination of any number of strategies;
- supporting [vendor extensions](http://swagger.io/specification/#vendorExtensions);
- supporting custom parsers that enables specific [vendor extensions](http://swagger.io/specification/#vendorExtensions);
- supporting custom parsers that enables [OpenAPI 3.0 (next) features](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md):
  - parser for enabling `schema` and `$ref` in all type of parameters [see next spec](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#parameterObject);
  - your custom parser.

## Why I have to use it?
As for now you can't use it, because it isn't even published to [NPM](https://www.npmjs.com) yet.  
This repo exists only for that who want to participate in creating of this project.

### If you don't want
Please return here at 2016-09-01 and try:
- This library for creating your own high quality code-generators;
- CLI tool inspired by [Yeoman](http://yeoman.io/) for integrating it in development process;
- Client code + mocks generator for [Angular 1](https://github.com/angular/angular.js) + [TypeScript](https://www.typescriptlang.org/);
- Client code + mocks generator for [Angular 2](https://angular.io/);
- And may be something more (like plugins for [Grunt](http://gruntjs.com/), [Gulp](http://gulpjs.com/)).

### If you do want
First of all - any, absolutely any, help will be highly appreciated.  
Second - if you want to help with coding read [CONTRIBUTING.md](CONTRIBUTING.md). There are instructions to build, run and test it.  
And last - some history and plans:  
I'm using swagger for code generating nearly a year. I've tried dozens of tools based on swagger, but result wasn't worth it.
In the end I've written [small library](https://github.com/Igmat/swagger-ts-codegen) and [grunt wrapper](https://github.com/Igmat/grunt-swagger-ng-ts) for it.  
Continiously improving them to fit needs of two my main web projects (one of them is already released) I've get inspiring results:
- It works :D
- Generated services for Angular 1.5 + TypeScript saves many hours for me and other FE developers in team;
- Grouping services, models and enums in components with strong typing gives really clean and maintainable project structure;
- Support for `schema.$ref` in all type of parameters from [next spec](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#parameterObject) makes code even better;
- Generating mocks with detecting patterns in properties' name in order to make human-readable responses for [ngMockE2E](https://docs.angularjs.org/api/ngMockE2E)
brings possibility for user test of FE with nearly real data with minimum coding even if BE isn't implemented at all;
- Previous paragraph makes project really decomposed into BE and FE (except using websockets and chunk file uploading);
- And a lot of other small workflow improvements.

Unfortunately, while trying to add new features, I realized that, as it often happens, I was doing right things in wrong way.  
After code review, I concluded that my code is too coupled and has some sort of bad practices in TypeScript and Nodejs world.  
So now I'm refactoring and porting it, because it has most of [this features](#what-is-it) implemented.  
Thanks for reading;) 

## Installation (Coming soon)

## Usage (Coming soon)

## Examples (Coming soon)

## Changelog
Recent changes can be viewed on the [CHANGELOG.md](CHANGELOG.md)

## How to Contribute
Read to contribute [CONTRIBUTING.md](CONTRIBUTING.md)

## How to Make Pull Request
Read to contribute [PULL_REQUEST_TEMPLATE.md](PULL_REQUEST_TEMPLATE.md)

## License

Copyright (c) Ihor Chulinda.
This source code is licensed under the [MIT license](LICENSE).
