import test from 'ava';
import mapAsync from '../lib/map';

import sleep from '../test-util/sleep';

test(async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.mapAsync = mapAsync;

    const start = Date.now();
    const ret = await arr.mapAsync(async n => {
        await sleep(10);
        return n * 2
    });
    const duration = Date.now() - start;
    t.truthy(duration < 20);
    t.deepEqual(ret, [
        2, 4, 6, 8, 10
    ]);
});

test('second argument is index', async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.mapAsync = mapAsync;

    let count = 0;
    const ret = await arr.mapAsync(async (n, i) => {
        t.is(i, count);
        count++;
        await sleep(10);
        return n * 2
    });
    t.deepEqual(ret, [
        2, 4, 6, 8, 10
    ]);
});

test('third argument is the array', async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.mapAsync = mapAsync;

    let count = 0;
    const ret = await arr.mapAsync(async (n, _, target) => {
        t.is(arr, target);
        count++;
        await sleep(10);
        return n * 2
    });
    t.deepEqual(ret, [
        2, 4, 6, 8, 10
    ]);
});

test('when throwing some error, returned array contain that error object instance', async t => {
    const arr = [1, 2, 3, 4, 5];
    const err = new Error('test');

    arr.mapAsync = mapAsync;

    const ret = await arr.mapAsync(async (n, i) => {
        await sleep(10);
        if (i % 2 === 0) {
            throw err;
        }
        return n * 2
    });
    t.deepEqual(ret, [
        err, 4, err, 8, err
    ]);
});

test('using `this` in callback is enabled', async t => {
    const arr = [1, 2, 3, 4, 5];

    arr.mapAsync = mapAsync;

    // can not fn.bind(this) to arrow functions
    const ret = await arr.mapAsync(async function(n) {
        t.is(this.value, 'value');
        await sleep(10);
        return n * 2
    }, {value: 'value'});

    t.deepEqual(ret, [
        2, 4, 6, 8, 10
    ]);
});

