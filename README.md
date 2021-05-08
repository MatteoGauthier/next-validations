# Welcome to next-validations 👋

![Version](https://img.shields.io/badge/version-0.1.6-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> NextJS API Validations

## 🏠 [Homepage](https://github.com/jellydn/next-validations)

### ✨ [Demo](https://next-validations-demo.productsway.com/)

![https://gyazo.com/bf4582f7b7aa0f0ae67c4cc337c4e974.gif](https://gyazo.com/bf4582f7b7aa0f0ae67c4cc337c4e974.gif)

## Prerequisites

- node >=10
- nextjs >= 9

## Install

```sh
yarn add next-validations
```

## Features

- [x] Support [Yup](https://github.com/jquense/yup) validation
- [x] Support [Fastest-Validator](https://github.com/icebob/fastest-validator) validation
- [x] Support [Joi](https://github.com/sideway/joi) validation
- [ ] ...

## Usage

### Validate custom API endpoint with Yup

```sh
yarn add yup next-validations
```

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const validate = withValidation({
  schema,
  type: 'Yup',
  mode: 'query',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.query);
};

export default validate(handler);
```

### Validate custom API endpoint with fastest-validator

```sh
yarn add fastest-validator next-validations
```

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';

const schema = {
  name: { type: 'string', min: 3, max: 255 },
  email: { type: 'email' },
  age: 'number',
};

const validate = withValidation({
  schema,
  type: 'FastestValidator',
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default validate(handler);
```

### Validate custom API endpoint with joi

```sh
yarn add joi next-connect next-validations
```

```typescript
import { NextApiRequest, NextApiResponse } from 'next';

import Joi from 'joi';
import connect from 'next-connect';
import { withValidation } from 'next-validations';

const schema = Joi.object({
  dob: Joi.date().iso(),
  email: Joi.string()
    .email()
    .required(),
  name: Joi.string().required(),
});

const validate = withValidation({
  schema,
  type: 'Joi',
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default connect().post(validate(), handler);
```

## Run tests

```sh
yarn test
```

## Author

👤 **Huynh Duc Dung**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Show your support

Give a ⭐️ if this project helped you!

[![support us](https://img.shields.io/badge/become-a patreon%20us-orange.svg?cacheSeconds=2592000)](https://www.patreon.com/jellydn)

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
