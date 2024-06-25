document.getElementById('connectButton').addEventListener('click', connectToMetaMask);

async function connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
           
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log('Connected account:', account);
            
            
            const publicKey = await getPublicKey(account);
            if (publicKey) {
                document.getElementById('publicKey').innerText = `Public Key: ${publicKey}`;
            } else {
                document.getElementById('publicKey').innerText = 'Public key retrieval failed. Please ensure permissions are granted.';
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        console.error('MetaMask is not installed!');
    }
}

async function getPublicKey(account) {
    try {
        const publicKey = await ethereum.request({
            method: 'eth_getEncryptionPublicKey',
            params: [account],
        });
        return publicKey;
    } catch (error) {
        if (error.code === 4001) {
            console.error('User rejected the request.');
        } else {
            console.error('An error occurred:', error);
        }
        return null;
    }
}

