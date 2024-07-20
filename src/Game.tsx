import React, { useState, useEffect } from "react";
import Box from "./components/Box";
import Instructions from "./components/Instruction";
import './main.css'
// Define types for state variables
interface BoxContent {
  type: "hero" | "villain";
  image: string;
}

const heroImages: string[] = [
  "/img/heros/1.webp",
  "/img/heros/2.jpg",
  "/img/heros/3.jpg",
  "/img/heros/4.jpg",
  "/img/heros/5.jpg",
  "/img/heros/6.jpg",
  "/img/heros/7.jpg",
  "/img/heros/8.jpg",
  "/img/heros/9.jpg",
  "/img/heros/10.jpg",
  "/img/heros/11.jpg",
  "/img/heros/12.jpg",
  "/img/heros/13.jpg",
  "/img/heros/14.jpg",
  "/img/heros/15.jpg",
  "/img/heros/16.jpg",
  "/img/heros/17.jpg",
  "/img/heros/18.webp",
  "/img/heros/19.jpg",
  "/img/heros/20.webp",
  "/img/heros/21.jpg",
  "/img/heros/22.jpg",
  "/img/heros/23.jpg",
  "/img/heros/24.jpg",
  // Add paths for all your hero images
];

const villainImages: string[] = [
  "/img/villains/1.webp",
  "/img/villains/2.webp",
  "/img/villains/3.webp",
  "/img/villains/4.webp",
  "/img/villains/5.webp",
  "/img/villains/6.webp",
  "/img/villains/7.webp",
  "/img/villains/8.webp",
  "/img/villains/9.webp",
  "/img/villains/10.webp",
  "/img/villains/11.webp",
  "/img/villains/12.webp",
  "/img/villains/13.webp",
  "/img/villains/14.webp",
  "/img/villains/15.webp",
  "/img/villains/16.webp",
  "/img/villains/17.webp",
  "/img/villains/18.webp",
  "/img/villains/19.webp",
  "/img/villains/20.webp",
  "/img/villains/21.webp",
  "/img/villains/22.webp",
  "/img/villains/23.webp",
  "/img/villains/24.webp",
  // Add paths for all your villain images
];

function Game() {
  const totalBoxes = 25;
  const [betAmount, setBetAmount] = useState<number>(0);
  const [numOfMines, setNumOfMines] = useState<number>(1);
  const [mineNum, setMineNum] = useState<number[]>([]);
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [cashOutMessage, setCashOutMessage] = useState<string>("");
  const [currentBalance, setCurrentBalance] = useState<number>(10); // Initial balance
  const [boxContent, setBoxContent] = useState<BoxContent[]>([]);

  useEffect(() => {
    setMine();
  }, [numOfMines]);

  useEffect(() => {
    setScore(0);
    setTotalProfit(0);
  }, [numOfMines, gameOver]);

  const setMine = () => {
    setGameOver(false);
    setOpenedBoxes([]);
    setScore(0);
    setTotalProfit(0);
    const mines: number[] = [];
    let content: BoxContent[] = Array(totalBoxes).fill({
      type: "hero",
      image: "",
    });

    while (mines.length < numOfMines) {
      const randomNum = Math.floor(Math.random() * totalBoxes);
      if (!mines.includes(randomNum)) {
        mines.push(randomNum);
        content[randomNum] = {
          type: "villain",
          image:
            villainImages[Math.floor(Math.random() * villainImages.length)],
        };
      }
    }

    // Fill the remaining with heroes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    content = content.map((item, index) => ({
      type: item.type === "villain" ? "villain" : "hero",
      image:
        item.type === "hero"
          ? heroImages[Math.floor(Math.random() * heroImages.length)]
          : item.image,
    }));

    setMineNum(mines);
    setBoxContent(content);
  };

  const checkBoxEntry = (index: number) => {
    if (!openedBoxes.includes(index) && !gameOver) {
      setOpenedBoxes((prev) => [...prev, index]);
      if (mineNum.includes(index)) {
        setGameOver(true);
        setCurrentBalance((prevBalance) => prevBalance - betAmount);
        setTotalProfit(0); // Reset profit to zero if a bomb is clicked
      } else {
        setScore((prevScore) => prevScore + 1);
        const profit = betAmount * (numOfMines * (score / 10));
        setTotalProfit(profit);
      }
    }
  };

  const handleCashOut = () => {
    const profit = betAmount * (numOfMines * (score / 10));
    setCurrentBalance((prevBalance) => prevBalance + profit);
    setTotalProfit(profit);
    setCashOutMessage(`Total profit is ${profit.toFixed(2)} shin`);
  };

  const resetGame = () => {
    setBetAmount(0);
    setNumOfMines(1);
    setMine();
    setCashOutMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/4 p-4 bg-gray-800 flex flex-col space-y-4">
        <div className="relative mt-14 flex flex-col space-y-2">
          <Instructions />
          <label className="text-lg">Bet Amount: (Shincoins)</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value))}
            className="bg-gray-700 text-white p-2 rounded-md w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Villains:</label>
          <select
            value={numOfMines}
            onChange={(e) => setNumOfMines(parseInt(e.target.value))}
            className="bg-gray-700 text-white p-2 rounded-md w-full"
          >
            {[...Array(24).keys()].map((i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-lg">Your Score:</label>
          <span className="text-green-500 font-semibold">{score}</span>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Total profit:</label>
          <input
            type="text"
            value={`${totalProfit.toFixed(2)} shin`}
            disabled
            className="bg-gray-700 text-white p-2 rounded-md w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Current Balance:</label>
          <input
            type="text"
            value={`${currentBalance.toFixed(2)} shin`}
            disabled
            className="bg-gray-700 text-white p-2 rounded-md w-full"
          />
        </div>
        <button
          className="bg-green-500 text-white p-2 rounded-md mt-4"
          onClick={handleCashOut}
        >
          Cashout
        </button>
        {cashOutMessage && (
          <div className="text-white text-center mt-2">{cashOutMessage}</div>
        )}
        <button
          className="bg-red-500 text-white p-2 rounded-md mt-2"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
      <div className="relative mt-14 w-3/4 p-4 flex justify-center items-center">
        <div className="grid grid-cols-5 gap-4">
          {Array(totalBoxes)
            .fill(null)
            .map((_, index) => (
              <Box
                key={index}
                index={index}
                opened={openedBoxes.includes(index)}
                isMine={mineNum.includes(index)}
                gameOver={gameOver}
                onClick={checkBoxEntry}
                content={boxContent[index]}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
