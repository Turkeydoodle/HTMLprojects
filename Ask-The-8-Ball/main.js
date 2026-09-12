document.addEventListener('DOMContentLoaded', function () {
    execute = document.getElementById('execute');
    result = document.getElementById('result');
    questionInput = document.getElementById('question');
    results = [
        "It is certain.", "It is decidedly true.", "Without a doubt.", "Yes, Signs point to yes.","Don't count on it.", "My reply is no.","Outlook not so good."
    ];
    function clicked() {
        return results[Math.floor(Math.random() * results.length)];
    }
    execute.addEventListener('click', function() {
        res = clicked();
        result.innerHTML = res; 
    });
});
