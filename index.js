    let keyPairA, keyPairB;
    let encryptedAB, encryptedBA;

    async function generateKeys() {
      keyPairA = await crypto.subtle.generateKey(
        { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true,
        ["encrypt", "decrypt"]
      );

      keyPairB = await crypto.subtle.generateKey(
        { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true,
        ["encrypt", "decrypt"]
      );
    }

    async function sendMessageToB() {
      const message = document.getElementById("messageA").value;
      const encoded = new TextEncoder().encode(message);

      encryptedAB = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        keyPairB.publicKey,
        encoded
      );

      document.getElementById("encryptedMessageAB").textContent = btoa(String.fromCharCode(...new Uint8Array(encryptedAB)));
    }

    async function decryptMessageFromA() {
      const decrypted = await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        keyPairB.privateKey,
        encryptedAB
      );

      const decoded = new TextDecoder().decode(decrypted);
      document.getElementById("decryptedMessageAB").textContent = decoded;
    }

    async function sendMessageToA() {
      const message = document.getElementById("messageB").value;
      const encoded = new TextEncoder().encode(message);

      encryptedBA = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        keyPairA.publicKey,
        encoded
      );

      document.getElementById("encryptedMessageBA").textContent = btoa(String.fromCharCode(...new Uint8Array(encryptedBA)));
    }

    async function decryptMessageFromB() {
      const decrypted = await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        keyPairA.privateKey,
        encryptedBA
      );

      const decoded = new TextDecoder().decode(decrypted);
      document.getElementById("decryptedMessageBA").textContent = decoded;
    }

    generateKeys(); 
