import test from 'ava';
import someAsync from '../lib/some';

import sleep from '../test-util/sleep';

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.someAsync = someAsync;

    const start = Date.now();
    const ret = await arr.someAsync(async n => {
        await sleep(10);
        return n === 1;
    });
    const duration = Date.now() - start;
    t.truthy(duration < 20);
    t.is(ret, true);
});

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.someAsync = someAsync;

    const start = Date.now();
    const ret = await arr.someAsync(async n => {
        await sleep(10);
        return n === 0;
    });
    const duration = Date.now() - start;
    t.truthy(duration < 20);
    t.is(ret, false);
});

