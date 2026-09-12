document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('night');

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            toggleButton.textContent = isDark ? 'Change to Day' : 'Change to Night';
        });
    }

    const execute = document.getElementById('execute');
    const result = document.getElementById('result');

    if (execute && result) {
        const questionInput = document.getElementById('question');
        const results = [
            'It is certain.',
            'It is decidedly true.',
            'Without a doubt.',
            'Yes, Signs point to yes.',
            "Don't count on it.",
            'My reply is no.',
            'Outlook not so good.'
        ];

        function clicked() {
            return results[Math.floor(Math.random() * results.length)];
        }

        execute.addEventListener('click', function () {
            result.innerHTML = clicked();
        });
    }

    const input = document.getElementById('input');
    const encrypts = document.getElementById('encrypts');
    const decrypts = document.getElementById('decrypts');
    const output = document.getElementById('output');

    if (input && encrypts && decrypts && output) {
        const key = 5;
        const range = 26;
        const aCode = 65;
        const zCode = range + aCode;

        function encipher() {
            const message = input.value.toUpperCase();
            output.innerHTML = '';
            for (let i = 0; i < message.length; i++) {
                let letter = message.charCodeAt(i);
                let newletter = letter;

                if (letter >= aCode && letter < zCode) {
                    newletter += key;
                    if (newletter >= zCode) {
                        newletter -= range;
                    }
                }

                newletter = String.fromCharCode(newletter);
                output.innerHTML += newletter;
            }
        }

        function decipher() {
            const message = input.value.toUpperCase();
            output.innerHTML = '';
            for (let i = 0; i < message.length; i++) {
                let letter = message.charCodeAt(i);
                let newletter = letter;

                if (letter >= aCode && letter < zCode) {
                    newletter -= key;
                    if (newletter < aCode) {
                        newletter += range;
                    }
                }

                newletter = String.fromCharCode(newletter);
                output.innerHTML += newletter;
            }
        }

        encrypts.onclick = encipher;
        decrypts.onclick = decipher;
    }
});