import './GameBoard.css';
import React from 'react';

import GameRow from './GameRow';
import GameTile from './GameTile';
import { SmallVee } from './pieces';

const DEFAULT_BOARD_WIDTH = 21;
const DEFAULT_BOARD_HEIGHT = 21;


export default class GameBoard extends React.Component {
    state = {
        matrix: null,
        currentTileRef: null,
        currentPiece: new SmallVee(),
    }

    constructor(props) {
        super();
        this.width = props.width || DEFAULT_BOARD_WIDTH;
        this.height = props.height || DEFAULT_BOARD_HEIGHT;
        this.state.matrix = this.generateMatrix(this.width, this.height);
        this.onMouseOverTile = this.onMouseOverTile.bind(this);
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    generateMatrix(width, height) {
        const matrix = [];
        for(let rowIdx=0; rowIdx<this.height; rowIdx++) {
            const cols = [];
            for(let colIdx=0; colIdx<this.width; colIdx++) {
                const cell = { ref: React.createRef() };
                cols.push(cell);
            }
            matrix.push(cols);
        }
        return matrix;
    }

    updateActiveTile(selectedTileRef) {
        // cleanup previous active tile if set
        if (this.state.currentTileRef) {
            this.state.currentTileRef.setState({ isActive: false });

            // cleanup previous adjacent tiles if set
            if (this.state.currentPiece) {
                const coords = { x: this.state.currentTileRef.x, y: this.state.currentTileRef.y };
                this.state.currentPiece.forEachTileAt(coords, ({ x, y }) => {
                    const tile = this.state.matrix[y][x];
                    tile.ref.current.setState({ isActive: false });
                })
            }
        }

        // set new active tile)
        this.setState({ currentTileRef: selectedTileRef.current });
        selectedTileRef.current.setState({ isActive: true });

        // set new active tiles on adjacent pieces
        if (this.state.currentPiece) {
            const coords = { x: selectedTileRef.current.x, y: selectedTileRef.current.y };
            this.state.currentPiece.forEachTileAt(coords, ({ x, y }) => {
                const tile = this.state.matrix[y][x];
                tile.ref.current.setState({ isActive: true });
            });
        }
    }

    onMouseOverTile(tileRef) {
        this.updateActiveTile(tileRef);
    }

    onKeyDown(event) {
        if (this.state.currentPiece) {
            if (event.key === '[') {
                const rotatedPiece = this.state.currentPiece.rotated({ clockwise: true });
                this.setState({ currentPiece: rotatedPiece });
                this.updateActiveTile(this.state.currentTileRef);
            }
        }
    }

    render() {
        const gameRows = [];
        this.state.matrix.forEach((row, rowIdx) => {
            const gameTiles = [];
            row.forEach((cell, colIdx) => {
                const gameTile = (
                    <GameTile
                        x={ colIdx }
                        y={ rowIdx }
                        ref={ cell.ref }
                        onmouseover={ this.onMouseOverTile.bind(this, cell.ref) }
                    />
                );
                gameTiles.push(gameTile);
            });
            const gameRow = (<GameRow y={ rowIdx }>{ gameTiles }</GameRow>);
            gameRows.push(gameRow);
        });

        return (
            <div className='bz-gameboard'>
                <table>
                    <tbody>
                        { gameRows }
                    </tbody>
                </table>
            </div>
        );
    }
}
