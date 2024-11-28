const { allowModification, typeMatch, Enum } = require("../../src/index");
allowModification(Array);

// The effect of the code in `./tags.js` can be achieved much more simply by using the `Enum` class.

const pieceList = [ "King", "Queen", "Rook", "Bishop", "Knight", "Pawn" ];

// Create a new enum "Piece".
const Piece = new Enum("Piece", pieceList);

// Instantiate a new Piece value containing a random piece from the list.
const randomPiece = Piece.tags.random();

// This does not throw an error, because randomPiece is in fact a piece.
typeMatch(randomPiece, Piece);

// Print the piece object
console.log(randomPiece);

// Print `Piece(_piecename_)`
console.log(randomPiece.toString());