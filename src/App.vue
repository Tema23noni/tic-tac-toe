<template>
 <main class="pt-8 text-center bg-gray-800 min-h-screen text-white">
  <h1 class="mb-8 text-3xl font-bold uppercase">TIC TAC TOE</h1>
  <button
   @click="isWithComp"
   class="px-4 py-2 text-xl bg-pink-500 hover:bg-pink-400 rounded-lg duration-300 mb-5">
   {{ withComp ? '🤖' : '👨' }}
  </button>
  <h3 class="text-2xl mb-4">
   Player "<span class="uppercase">{{ player }}"</span>
  </h3>
  <div class="w-full flex justify-center items-center">
   <div class="w-[300px] grid grid-cols-3 grid-rows-3 mb-8">
    <div
     v-for="(cell, x) in board"
     :key="x"
     @click="makeMove(x)"
     :class="` border-2 border-white w-[100px] select-none h-[100px]  ${
      cell === 'x' ? 'text-pink-500' : 'text-blue-500'
     } hover:bg-gray-600 flex justify-center items-center  text-[72px] uppercase cursor-pointer`">
     {{ cell === 'x' ? 'x' : cell === 'o' ? 'o' : '' }}
    </div>
   </div>
  </div>
  <h3 v-if="winner" class="text-2xl mb-4 uppercase">
   {{ winner === 'x' || winner === 'o' || winner === 'tie' ? `Win ${winner}` : winner }}
  </h3>
  <button @click="ResetGame" class="px-4 py-2 bg-pink-500 rounded-lg duration-300">
   Reset Game
  </button>
 </main>
</template>

<script>
import { ref } from 'vue';
import { checkWinner, randomStart, bestMove } from './utils/index';
export default {
 data() {
  const player = 'x';
  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let withComp = ref(false);
  let isGame = ref(false);
  return {
   player,
   board,
   withComp,
   isGame,
  };
 },
 computed: {
  winner() {
   return checkWinner(this.board);
  },
 },
 methods: {
  ResetGame() {
   this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
   this.player = 'x';
   this.player;
   this.board[randomStart()] = 'x';
   this.isGame = false;
   this.player = 'o';
  },
  isWithComp() {
   console.log(this.withComp);
   if (!this.isGame && !this.withComp) {
    console.log('work');
    this.board[randomStart()] = 'x';
    this.player = 'o';
   }
   this.withComp = !this.withComp;
  },
  makeMove(x) {
   if (typeof this.board[x] === 'number' && this.withComp) {
    this.board[x] = 'o';
    this.player = 'x';
    const timeOutMove = setTimeout(() => {
     let move = bestMove(this.board);
     this.board[move] = 'x';
     this.player = 'o';
    }, 1000);
    return () => clearTimeout(timeOutMove);
   } else if (typeof this.board[x] === 'number') {
    this.board[x] = this.player;
    this.player = this.player === 'x' ? 'o' : 'x';
   }
  },
 },
};
</script>
