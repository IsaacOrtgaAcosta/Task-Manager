const bcrypt = require("bcrypt");

(async () => {
  const plain = process.argv[2];
  const hash = await bcrypt.hash(plain, 10);
  console.log(hash);
})();