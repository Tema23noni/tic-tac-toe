export const randomStart = () => {
 let randomStartArr = [0, 4, 2, 8];
 return randomStartArr[Math.floor(Math.random() * randomStartArr.length)];
};
export const checkWinner = (board) => {
 let winner = null;
 let winLine = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 4, 8],
 ];
 for (let i = 0; i < winLine.length; i++) {
  let res = equals3(board[winLine[i][0]], board[winLine[i][1]], board[winLine[i][2]]);
  if (res !== '') {
   return res;
  }
 }

 let openSpots = 0;
 for (let i = 0; i < 9; i++) {
  if (typeof board[i] === 'number') {
   openSpots++;
  }
 }

 if (winner == null && openSpots == 0) {
  return 'tie';
 } else {
  return winner;
 }
};
export const equals3 = (a, b, c) => {
 return a == b && b == c && a != '' ? a : '';
};
export const bestMove = (board) => {
 const move = minimax(board, 'x').index;
 return move;
};

export function minimax(newBoard, player) {
 const emptyCells = newBoard.filter((e) => typeof e == 'number');
 if (checkWinner(newBoard) === 'o') {
  return { score: -10 };
 } else if (checkWinner(newBoard) === 'x') {
  return { score: 10 };
 } else if (emptyCells.length === 0) {
  return { score: 0 };
 }
 let moves = [];
 for (let i = 0; i < emptyCells.length; i++) {
  let move = {};
  move.index = emptyCells[i];
  newBoard[emptyCells[i]] = player;
  if (player == 'x') {
   let result = minimax(newBoard, 'o');
   move.score = result.score;
  } else {
   let result = minimax(newBoard, 'x');
   move.score = result.score;
  }
  newBoard[emptyCells[i]] = move.index;
  moves.push(move);
 }
 let bestMove;
 if (player === 'x') {
  let bestScore = -10000;
  for (var i = 0; i < moves.length; i++) {
   if (moves[i].score > bestScore) {
    bestScore = moves[i].score;
    bestMove = i;
   }
  }
 } else {
  let bestScore = 10000;
  for (var i = 0; i < moves.length; i++) {
   if (moves[i].score < bestScore) {
    bestScore = moves[i].score;
    bestMove = i;
   }
  }
 }
 return moves[bestMove];
}
