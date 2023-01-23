const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04d404ad18d4e986af89b44a2a99eade34c4ad1a2af1161b7a44c2b07831063807b1ea7b272e4b077b22a8ff4fb0136fa796a87a7697772db568ded17e85bfea3c": 100,
  "040133d99aeeb75dedc605e74fcf2ec31c2c9ae80bf428885ec20aa2be6151a9c5c268b941027b69bdae45df85fc2524ecbe6101188ae6d21201e9244b91a76a13": 50,
  "0405b67c42dc463835f7895b1a5218e223c61564b08faadcd17105cf5280cf116022e18c82d2200dcb56fdbccae0d84eeac4a1e1a09ca350b06a0267dd0ac81f87": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  // commit try

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
