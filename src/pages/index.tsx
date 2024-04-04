import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useCallback, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currTurn, setCurrTurn] = useState('X');
  const [winner, setWinner] = useState('*');
  const [board, setboard] = useState([['*', '*', '*'], ['*', '*', '*'], ['*', '*', '*']]);

  function btnClicked(x: number, y: number) {
    if (board[x][y] != '*') return;
    const newBoard = [...board]
    newBoard[x][y] = currTurn;
    setboard(newBoard)
    if (currTurn == 'X') setCurrTurn('O');
    else setCurrTurn('X')
  }

  const checkForWin = useCallback(() => {
    if (board[0][0] != '*'
      && board[0][0] == board[0][1]
      && board[0][1] == board[0][2])
      setWinner(board[0][0]);
    else if (board[1][0] != '*'
      && board[1][0] == board[1][1]
      && board[1][1] == board[1][2])
      setWinner(board[1][0]);
    else if (board[2][0] != '*'
      && board[2][0] == board[2][1]
      && board[2][1] == board[2][2])
      setWinner(board[2][0]);
    else if (board[0][0] != '*'
      && board[0][0] == board[1][0]
      && board[1][0] == board[2][0])
      setWinner(board[0][0]);
    else if (board[0][1] != '*'
      && board[0][1] == board[1][1]
      && board[1][1] == board[2][1])
      setWinner(board[0][1]);
    else if (board[0][2] != '*'
      && board[0][2] == board[1][2]
      && board[1][2] == board[2][2])
      setWinner(board[0][2]);
    else if (board[0][0] != '*'
      && board[0][0] == board[1][1]
      && board[1][1] == board[2][2])
      setWinner(board[0][0]);
    else if (board[0][2] != '*'
      && board[0][2] == board[1][1]
      && board[1][1] == board[2][0])
      setWinner(board[0][2]);
  }, [board])

  useEffect(() => {
    checkForWin();
  }, [checkForWin])

  function restart() {
    setboard([['*', '*', '*'], ['*', '*', '*'], ['*', '*', '*']]);
    setWinner('*');
    setCurrTurn('X');
  }
  return (
    <>
      <Head>
        <title>TicTacToe</title>
        <meta name="description" content="time to relax" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className="wrapper">
          <h1 className={styles.heading}>Tic Tac Toe</h1>
          {winner == '*' &&
            <>
              <div className={styles.gameWrapper}>
                <button className={styles.tile} onClick={() => btnClicked(0, 0)}>{board[0][0] == '*' ? '' : board[0][0]}</button>
                <button className={styles.tile} onClick={() => btnClicked(0, 1)}>{board[0][1] == '*' ? '' : board[0][1]}</button>
                <button className={styles.tile} onClick={() => btnClicked(0, 2)}>{board[0][2] == '*' ? '' : board[0][2]}</button>
                <button className={styles.tile} onClick={() => btnClicked(1, 0)}>{board[1][0] == '*' ? '' : board[1][0]}</button>
                <button className={styles.tile} onClick={() => btnClicked(1, 1)}>{board[1][1] == '*' ? '' : board[1][1]}</button>
                <button className={styles.tile} onClick={() => btnClicked(1, 2)}>{board[1][2] == '*' ? '' : board[1][2]}</button>
                <button className={styles.tile} onClick={() => btnClicked(2, 0)}>{board[2][0] == '*' ? '' : board[2][0]}</button>
                <button className={styles.tile} onClick={() => btnClicked(2, 1)}>{board[2][1] == '*' ? '' : board[2][1]}</button>
                <button className={styles.tile} onClick={() => btnClicked(2, 2)}>{board[2][2] == '*' ? '' : board[2][2]}</button>
              </div>
              <h2 className={styles.subHeading}>{currTurn}&apos;s Turn</h2>
            </>
          }
          {
            winner != '*' &&
            <>
              <h2 className={styles.subHeading}> {winner} won!!</h2>
              <div className={styles.restartBtnWrapper}>
                <button className={styles.restartBtn} onClick={restart}>Play Again</button>
              </div>
            </>
          }
        </div>
      </main>
    </>
  );
}
