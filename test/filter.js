import test from 'ava';
import filterAsync from '../lib/filter';

import sleep from '../test-util/sleep';

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.filterAsync = filterAsync;

    const start = Date.now();
    const ret = await arr.filterAsync(async n => {
        await sleep(10);
        return n % 2 === 0;
    });
    const duration = Date.now() - start;
    t.truthy(duration < 20);
    t.deepEqual(ret, [
        2, 4
    ]);
});

