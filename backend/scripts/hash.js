const bcrypt = require("bcrypt");

(async () => {
  const plain = process.argv[2];

  if(!plain){
    console.error("You must pass a password: node hash.js password");
    process.exit(1);
  }
  const hash = await bcrypt.hash(plain, 10);
})();