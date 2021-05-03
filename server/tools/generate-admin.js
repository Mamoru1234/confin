// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypt = require('crypto');

function createHash(secret, email, password) {
  const hash = crypt.createHmac('sha512', secret);
  hash.update(email);
  hash.update(password);
  return hash.digest().toString('base64');
}

function genAdmin() {
  const secret = process.argv[2];
  const email = process.argv[3];
  const password = process.argv[4];
  console.log(`Email: ${email} Password: ${password}`);
  const hash = createHash(secret, email, password);
  console.log(
    `INSERT INTO public.users ("id", "firstName", "lastName", "role", "password", "email") VALUES (DEFAULT, 'Oleksiy', 'Gontar', 'ADMIN', '${hash}', '${email}');`,
  );
}

genAdmin();
