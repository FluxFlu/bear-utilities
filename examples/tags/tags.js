const { Tag, Or, Lit, allowModification, typeMatch } = require("../../src/index");
allowModification(Array);

const pieceList = [ "King", "Queen", "Rook", "Bishop", "Knight", "Pawn" ];

// Create a new tag "Piece" typed to make sure it can only ever contain a valid piece string.
const Piece = new Tag("Piece", Or(...pieceList.map(e => Lit(e))));

// Instantiate a new Piece value containing a random piece from the list.
const randomPiece = Piece.instance(pieceList.random());

// This does not throw an error, because randomPiece is in fact a piece.
typeMatch(randomPiece, Piece);

// Print the piece object
console.log(randomPiece);

// Print `Piece(_piecename_)`
console.log(randomPiece.toString());

// Get the value contained within the tag.
let strValue = randomPiece.value;

// Since this is a string, we can manipulate it like normal.
strValue += " =)";

// Print `_piecename_ =)`
console.log(strValue);

// This throws an error. Even though it would be a valid piece, we did not instantiate it using the `Piece.instance` function.
typeMatch("King", Piece);