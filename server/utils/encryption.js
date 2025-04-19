// utils/encryption.js
const crypto = require("crypto");
const { getKey } = require("./keyManager");

const algorithm = "aes-256-cbc";
const ivLength = 16;

function encrypt(text) {
  const key = getKey();
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    data: encrypted,
    mac: generateMac(encrypted),
  };
}

function decrypt(encryptedData, ivHex) {
  const key = getKey();
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function generateMac(data) {
  const key = getKey();
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

function verifyMac(data, mac) {
  const expectedMac = generateMac(data);
  return expectedMac === mac;
}

module.exports = {
  encrypt,
  decrypt,
  generateMac,
  verifyMac,
};
