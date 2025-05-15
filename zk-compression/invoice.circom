pragma circom 2.0.0;

include "circomlib/poseidon.circom";
include "circomlib/comparators.circom";

template InvoiceVerifier() {
    // Private inputs
    signal private input invoiceHash;
    signal private input amount;
    signal private input timestamp;
    signal private input merklePath[32];
    signal private input merklePathIndices[32];

    // Public inputs
    signal input merkleRoot;
    signal input expectedAmount;
    signal input expectedTimestamp;

    // Components
    component poseidon = Poseidon(3);
    component isLessThan = LessThan(32);

    // Hash the invoice data
    poseidon.inputs[0] <== invoiceHash;
    poseidon.inputs[1] <== amount;
    poseidon.inputs[2] <== timestamp;

    // Verify Merkle path
    var currentHash = poseidon.out;
    for (var i = 0; i < 32; i++) {
        var left = merklePathIndices[i] * (merklePath[i] - currentHash) + currentHash;
        var right = (1 - merklePathIndices[i]) * (merklePath[i] - currentHash) + currentHash;
        currentHash = Poseidon(2)([left, right]);
    }

    // Verify Merkle root
    currentHash === merkleRoot;

    // Verify amount and timestamp
    isLessThan.in[0] <== amount;
    isLessThan.in[1] <== expectedAmount;
    isLessThan.out === 1;

    isLessThan.in[0] <== timestamp;
    isLessThan.in[1] <== expectedTimestamp;
    isLessThan.out === 1;
}

component main = InvoiceVerifier(); 