import test from 'ava';
import mapAsync from '../lib/map';

import sleep from '../test-util/sleep';

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.mapAsync = mapAsync;

    const ret = await arr.mapAsync(async n => {
        await sleep(10);
        return n * 2
    });
    t.deepEqual(ret, [
        2, 4, 6, 8, 10
    ]);
});

