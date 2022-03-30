import {test} from '../../util/test.js';
import {convexHull} from '../../../src/util/convex_hull.js';
import Point from '@mapbox/point-geometry';

test('convex hull', (t) => {
    t.test('create', (t) => {
        const points = [
            new Point(7, 3),
            new Point(6, 2),
            new Point(4, 1),
            new Point(3, 3),
            new Point(1, 1),
            new Point(5, 5),
            new Point(9, 7),
            new Point(2, 4)
        ];

        const expected = [
            new Point(1, 1),
            new Point(4, 1),
            new Point(6, 2),
            new Point(7, 3),
            new Point(9, 7),
            new Point(2, 4)
        ];

        t.deepEqual(convexHull(points), expected);
        t.end();
    });

    t.test('less than 3 points', (t) => {
        const points = [
            new Point(1, 1),
            new Point(-2, 3)
        ];

        t.deepEqual(convexHull(points), points);
        t.end();
    });

    t.test('colinear points', (t) => {
        const points = [
            new Point(-3, 2),
            new Point(6, 0),
            new Point(-3, -2),
            new Point(0, 0),
            new Point(-3, 0)
        ];

        const expected = [
            new Point(-3, -2),
            new Point(6, 0),
            new Point(-3, 2)
        ];

        t.deepEqual(convexHull(points), expected);
        t.end();
    });

    t.test('duplicate points', (t) => {
        const points = [
            new Point(256, 256),
            new Point(256.1, 112.1),
            new Point(400.2, 112.2),
            new Point(400.1, 256.1),
            new Point(256, 256),
            new Point(256.1, 25.2),
            new Point(486.2, 25.1),
            new Point(486.1, 256.1)
        ];

        const expected = [
            new Point(256, 256),
            new Point(256.1, 25.2),
            new Point(486.2, 25.1),
            new Point(486.1, 256.1),
            new Point(400.1, 256.1)
        ];

        t.deepEqual(convexHull(points), expected);
        t.end();
    });

    t.end();
});
