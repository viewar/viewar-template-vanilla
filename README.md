# ViewAR vanilla sample

[![Build Status](https://travis-ci.com/viewar/viewar-template-vanilla.svg?&branch=master)](https://travis-ci.com/viewar/viewar-template-vanilla)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=viewar/viewar-template-vanilla)](https://dependabot.com)
[![PRs Welcome][pr-welcome]](http://makeapullrequest.com)
[![Conventional Commits](https://img.shields.io/badge/✔-Conventional%20Commits-blue.svg)](https://conventionalcommits.org)

[pr-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

This sample project demonstrates a basic usage of the [ViewAR Api](https://www.npmjs.com/package/viewar-api) using pure JavaScript without any framework.

#### Features:

- Insert models into 3D scene
- Move, rotate models in the scene
- Remove models
- Change materials of models

## install

This sample project is meant to be used by [viewar-cli](https://github.com/viewar/viewar-cli). If you do not have this tool installed you can use npm to install it globally:

```bash
npm install -g viewar-cli
```

To proceed you need a [ViewAR](https://www.viewar.com/) account. If you do not have an account you can create one for free in the [developer](https//developer.viewar.com/user/register) section.
If are not logged in or have created a new account you need to log in using the viewar-cli by entering:

```bash
viewar-cli login
```

Create a new project directory and navigate via terminal into it. Use the following command
to start a wizard which will help you with the initialization of a new [ViewAR](https://www.viewar.com/) project:

```bash
viewar-cli init
```

1. In the wizard select your user account.
2. In the next step you select `Sample project` and than `Vanilla sample`
3. In the following step you need to enter an app bundle id of your app. If you have no apps registered yet, you need to head over to the [ViewAR developer backend](https://developer.viewar.com/configuration/list) and create a new app.
4. Enter a desired app version (default: 1.0)
5. In the last step you may choose any of the trackers, since they are not used in this sample.

## development

Visit https://webversion.viewar.com/YOUR-BUNDLE/YOUR-VERSION/ to run your app in the browser. (For example: https://webversion.viewar.com/com.myCompany.ARapp/1.0/)

To start the local development server with WebGL support enter:

```bash
npm run start
```

The local development server without WebGL support (mock mode) will enable you faster development of the ui. To start the mock mode enter:

```bash
npm run start:mock
```

## deployment

to deploy your changes enter

```bash
viewar-cli deploy YOUR-BUNDLE YOUR-VERSION
```

you can run your app on an iOS device by entering the bundle id into the [ViewAR SDK app](https://itunes.apple.com/at/app/viewar-sdk/id1097511807?mt=8) available in the [AppStore](https://www.apple.com/de/ios/app-store/).

## licence

Copyright (c) 2018, ViewAR GmbH

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

Source: http://opensource.org/licenses/ISC
