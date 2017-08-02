import test from 'ava';
import forEachAsync from '../lib/forEach';

import sleep from '../test-util/sleep';

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.forEachAsync = forEachAsync;

    const start = Date.now();
    const ret = [];
    await arr.forEachAsync(async n => {
        await sleep(10);
        ret.push(n * 2);
    });
    const duration = Date.now() - start;
    t.truthy(duration < 20);
    t.deepEqual(ret.sort(), [
        2, 4, 6, 8, 10
    ]);
});

