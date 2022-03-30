// @flow

import Point from '@mapbox/point-geometry';

// Computes convex hull for the provided set of points
export function convexHull(points: Point[]): Point[] {
    if (points.length < 3) {
        return points;
    }

    const result: Point[] = [];
    let leftmost = 0;

    // Use the leftmost point as the starting point
    const pred = (a, b) => {
        if (a.x !== b.x)
            return a.x < b.x;
        return a.y < b.y;
    };

    for (let i = 1; i < points.length; i++) {
        if (pred(points[i], points[leftmost])) {
            leftmost = i;
        }
    }

    let point = leftmost;

    do {
        result.push(points[point]);

        // Find the next outermost point
        let candidate = 0;
        const current = points[point];

        for (let i = 0; i < points.length; i++) {
            const a = points[i];
            const b = points[candidate];
            const cross = (a.x - current.x) * (b.y - current.y) - (a.y - current.y) * (b.x - current.x);

            // In case of collinear points choose the farthest one
            if (cross > 0 || (cross === 0 && current.distSqr(a) > current.distSqr(b))) {
                candidate = i;
            }
        }

        // Set the best candidate as next point
        point = candidate;

    } while (point !== leftmost);

    return result;
}
