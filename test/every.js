import test from 'ava';
import everyAsync from '../lib/every';

import sleep from '../test-util/sleep';

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.everyAsync = everyAsync;

    const start = Date.now();
    const ret = await arr.everyAsync(async n => {
        await sleep(10);
        return n < 6;
    });
    const duration = Date.now() - start;
    t.truthy(duration < 20);
    t.is(ret, true);
});

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.everyAsync = everyAsync;

    const start = Date.now();
    const ret = await arr.everyAsync(async n => {
        await sleep(10);
        return n < 5;
    });
    const duration = Date.now() - start;
    t.truthy(duration < 20);
    t.is(ret, false);
});

