const elegantStatus = require('./index');

let done = elegantStatus('Perform assessment - success');
setTimeout(() => done(true), 1000);

setTimeout(() => {
    done = elegantStatus('Set defense systems - error');
    setTimeout(() => done(false), 1000);
}, 2000);

setTimeout(() => {
    done = elegantStatus('Set defense systems - change symbols');
    done.updateSymbols('OK', 'X');
    setTimeout(() => done.updateText('Symbols changed'), 1000);
    setTimeout(() => done(true), 2000);
    setTimeout(() => {
        done.stop();
    }, 2000);
}, 4000);
