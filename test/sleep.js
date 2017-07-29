import test from 'ava';
import sleep from '../test-util/sleep';

test(async t => {
    const start = Date.now();
    await sleep(1000);
    const duration = Date.now() - start;
    t.truthy(duration >= 1000);
});

