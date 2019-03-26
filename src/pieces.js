/*
 * Represents a single tile in a piece and specifies adjacent tiles.
 * NOTE: in a (hypothetical) triangular configuration, the top tile would be ignored.
 */
class Node {
    constructor({ left=null, top=null, right=null, bottom=null }={}) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}

class BasePiece {
    constructor(node) {
        this.node = node || new Node();
    }

    rotated({ clockwise=true }={}) {
        // create a copy
        const rotatedPiece = Object.create(this);

        this._forEachNodeAt({}, rotatedPiece.node, (_, childNode) => {
            const left = childNode.left;
            const top = childNode.top;
            const right = childNode.right;
            const bottom = childNode.bottom;

            if (clockwise) {
                childNode.left = bottom;
                childNode.top = left;
                childNode.right = top;
                childNode.bottom = right;
            }
            else {
                childNode.left = top;
                childNode.top = right;
                childNode.right = bottom;
                childNode.bottom = left;
            }
        });
        return rotatedPiece;
    }

    /*
     * Call provided callback for each node in piece.
     */
    forEachTileAt({ x=0, y=0 }={}, callback) {
        return this._forEachNodeAt({ x, y }, this.node, callback);
    }

    _forEachNodeAt({ x, y }, node, callback) {
        if (node.left) {
            this._forEachNodeAt({ x: x-1, y: y }, node.left, callback);
        }
        if (node.top) {
            this._forEachNodeAt({ x: x, y: y+1 }, node.top, callback);
        }
        if (node.right) {
            this._forEachNodeAt({ x: x+1, y: y }, node.right, callback);
        }
        if (node.bottom) {
            this._forEachNodeAt({ x: x, y: y-1 }, node.bottom, callback);
        }
        callback({ x, y }, node);
        return node;
    }
}

export class SmallVee extends BasePiece {
    constructor() {
        const children = {
            left: new Node(),
            top: new Node()
        };
        super(children);
    }
}
