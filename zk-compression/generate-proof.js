const snarkjs = require('snarkjs');
const fs = require('fs');
const path = require('path');

async function generateProof(invoiceData) {
  const { invoiceHash, amount, timestamp, merklePath, merklePathIndices } = invoiceData;

  // Load the circuit
  const circuitPath = path.join(__dirname, 'invoice.wasm');
  const zkeyPath = path.join(__dirname, 'invoice_final.zkey');

  // Generate the proof
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    {
      invoiceHash,
      amount,
      timestamp,
      merklePath,
      merklePathIndices,
    },
    circuitPath,
    zkeyPath
  );

  return {
    proof,
    publicSignals,
  };
}

async function verifyProof(proof, publicSignals) {
  const verificationKey = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'verification_key.json'), 'utf8')
  );

  const result = await snarkjs.groth16.verify(
    verificationKey,
    publicSignals,
    proof
  );

  return result;
}

module.exports = {
  generateProof,
  verifyProof,
}; 