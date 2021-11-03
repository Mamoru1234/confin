// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypt = require('crypto');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

function createHash(secret, email, password) {
  const hash = crypt.createHmac('sha512', secret);
  hash.update(email);
  hash.update(password);
  return hash.digest().toString('base64');
}

function genAdmin() {
  const secret = process.env.APP_PASS_SECRET;
  if (!secret) {
    throw new Error('Please specify secret');
  }
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASS;
  console.log(`Email: ${email} Password: ${password}`);
  const hash = createHash(secret, email, password);
  console.log(
    `INSERT INTO public.users ("id", "firstName", "lastName", "role", "password", "email") VALUES (DEFAULT, 'Oleksiy', 'Gontar', 'ADMIN', '${hash}', '${email}');`,
  );
}

genAdmin();
