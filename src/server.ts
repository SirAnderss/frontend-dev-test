import { createServer, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

const products = [
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc1',
    name: 'Leche Alqueria Megalitro 1.1L',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/16416332-500-auto?v=1762471543&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc2',
    name: 'Hojuela de maiz Zucaritas 330gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/16031870-500-auto?v=1762361747&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc3',
    name: 'MILO 500gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/15808899-500-auto?v=1762450051&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc4',
    name: 'DETODITO 165gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/15754148-500-auto?v=1762472511&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc5',
    name: 'Leche Alqueria Megalitro 1.1L',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/16416332-500-auto?v=1762471543&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc6',
    name: 'Hojuela de maiz Zucaritas 330gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/16031870-500-auto?v=1762361747&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc7',
    name: 'MILO 500gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/15808899-500-auto?v=1762450051&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc8',
    name: 'DETODITO 165gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/15754148-500-auto?v=1762472511&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabc9',
    name: 'Leche Alqueria Megalitro 1.1L',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/16416332-500-auto?v=1762471543&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabcd0',
    name: 'Hojuela de maiz Zucaritas 330gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/16031870-500-auto?v=1762361747&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabd1',
    name: 'MILO 500gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/15808899-500-auto?v=1762450051&width=500&height=auto&aspect=true',
  },
  {
    id: 'cb1efe12-0095-477e-9f26-7894766eabd2',
    name: 'DETODITO 165gr',
    image:
      'https://exitocol.vtexassets.com/arquivos/ids/15754148-500-auto?v=1762472511&width=500&height=auto&aspect=true',
  },
];

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      product: Model,
      transaction: Model,
    },

    routes() {
      // this.passthrough('https://sandbox.wompi.co/v1/**');
      this.namespace = 'api';

      this.get('/products', (schema, _) => {
        // @ts-ignore
        return schema.products.all();
      });

      this.get('/transactions/:id', (schema, request) => {
        let id = request.params.id;

        if (id) {
          // @ts-ignore
          return schema.movies.first(id);
        }
      });
    },

    seeds(server) {
      server.create('transaction', {
        // @ts-ignore
        data: {
          id: faker.random.alphaNumeric(),
          reference: faker.random.alphaNumeric(),
          status: faker.helpers.arrayElement(['APPROVED', 'REJECTED']),
          payment_method_type: faker.finance.creditCardIssuer(),
          currency: faker.finance.currencyCode(),
          amount_in_cents: faker.datatype.number({ min: 1000000 }),
        },
      });

      products.forEach(product => {
        server.create('product', {
          ...product,
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(10000, 50000, 0),
        });
      });
    },
  });
}
