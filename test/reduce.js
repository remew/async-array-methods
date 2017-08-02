import test from 'ava';
import reduceAsync from '../lib/reduce';

import sleep from '../test-util/sleep';

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.reduceAsync = reduceAsync;

    const start = Date.now();
    const ret = await arr.reduceAsync(async (result, n) => {
        await sleep(10);
        return result + n;
    });
    const duration = Date.now() - start;
    t.truthy(duration >= 50);
    t.deepEqual(ret, 15);
});

test('scanning from left to right', async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.reduceAsync = reduceAsync;

    const ret = await arr.reduceAsync(async (order, _, i) => {
        await sleep(10);
        return [...order, i];
    }, []);
    t.deepEqual(ret, [
        0, 1, 2, 3, 4
    ]);
});

