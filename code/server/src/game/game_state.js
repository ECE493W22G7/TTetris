class GameState {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.grid = [];
        this.rowsCompleted = 0;
        this.requiredRows = 20;
        for (var y = 0; y < height; y++) {
            this.grid.push([]);
            for (var x = 0; x < width; x++) {
                this.grid[y].push(null);
            }
        }
    }

    checkPieceCollision(piece) {
        // checks if the piece matrix is colliding with the any part of the board 
        let pieceMatrix = piece.getMatrix();
        let size = pieceMatrix.length;

        for (let y = size - 1; y >= 0; y--) {
            for (let x = 0; x < size; x++) {
                if (pieceMatrix[y][x] === 1) {
                    let gridY = piece.ofy + y;
                    let gridX = piece.ofx + x;
                    
                    if (gridX < 0){
                        return "left";
                    }

                    if (gridX >= this.width) {
                        return "right";
                    }

                    if (gridY < 0) {
                        return "top"
                    }

                    if (gridY >= this.height) {
                        return "bottom"
                    }
                    
                    if (this.grid[gridY][gridX] != null){
                        return "block";
                    }
                }
            }
        }

        return null;
    }

    // This function is super expensive to ensure the grid is always valid.
    // only call this if you're sure the piece will fit 
    // use `isPieceColliding` before using this. 
    dropPiece(piece, playerId) {
        let collision = this.checkPieceCollision(piece);
        let isBlockBottom = (value) => value == "block" || value == "bottom";

        if (!isBlockBottom(collision)) {
            // move it down untill it is
            do {
                piece.ofy += 1;
                collision = this.checkPieceCollision(piece);
            } while (!isBlockBottom(collision))
        }

        // now it must be colliding so move it up untill it isnt/ or it is past the top
        do {
            piece.ofy -= 1;
            collision = this.checkPieceCollision(piece);
        } while (isBlockBottom(collision));

        if (collision == "top") {
            return false;
        }

        console.log("adding piece to board");
        this._addPiece(piece, playerId);
        return true;
    }

    _addPiece(piece, playerId) {
        let pieceMatrix = piece.getMatrix();
        let size = pieceMatrix.length;

        console.log(`adding ${playerId} piece`);
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (pieceMatrix[y][x]) {
                    let gridY = piece.ofy + y;
                    let gridX = piece.ofx + x;
                    
                    console.log(`Block [${gridY}][${gridX}] added`);
                    this.grid[gridY][gridX] = playerId;
                }
            }
        }
        this._eliminateRows();
    }

    _eliminateRows() {
        for (let row = this.height - 1; row >= 0; row--) {
            // if this row is full
            if (!this.grid[row].includes(null)) {
                // remove the row
                this.grid.splice(row, 1)
                // and add an empty row to the top
                this.grid.unshift(new Array(this.width).fill(null));
                this.rowsCompleted++
            }

        }
    }
}

export {GameState}