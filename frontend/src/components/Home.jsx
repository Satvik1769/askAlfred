import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const Home = () => {
  const navigate = useNavigate();
  const networks = [
    "Ethereum",
    "BNB",
    "Polygon",
    "Optimism",
    "Gnosis",
    "Avalanche",
    "Arbitrum",
    "Fantom",
    "Klaytn",
    "Aurora",
    "zksync",
    "Base",
  ];

  return (
    <div className="relative">
      <NavigationBar />
      <div className="relative flex flex-col h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <div
          className="flex flex-col lg:flex-row justify-center w-full "
          style={{ height: "600px" }}
        >
          <div className="flex flex-col justify-center w-full xl:w-1/3 sm:w-3/4 sm:mt-60 h-500 p-5 md:ml-6 outline-black outline-2 animate-fadeInLeft">
            <h1 className="text-xl md:text-3xl font-bold sm:text-4xl">
              Become Bruce Wayne with Alfred,
            </h1>
            <h1 className="text-xl md:text-3xl font-bold sm:text-4xl my-1">
              Your Crypto-Savvy Butler!
            </h1>
            <p>
              Meet Alfred, your wise and sophisticated butler, here to guide you
              through the bustling world of cryptocurrencies. With askAlfred,
              leverage the power of advanced AI to predict the best moments to
              swap your tokens, turning your crypto portfolio into a fortune fit
              for a billionaire!
            </p>
          </div>
          <img
            src="/alfred2.png"
            alt="Alfred the butler"
            className="h-550 animate-fadeInRight "
            style={{ width: "850px" }}
          />
        </div>
        <div
          className="flex flex-col-reverse lg:flex-row  justify-center lg:items-center w-full mt-20"
          style={{ height: "600px" }}
        >
          <img
            src="/portfolio.webp"
            alt="Portfolio"
            className=" mt-20 lg:h-200 animate-fadeInLeft "
            style={{ height: "350px" }}
          />
          <div className="flex flex-col justify-center w-full xl:w-1/3 sm:w-3/4 sm:mt-60 h-500 p-5 md:ml-6 animate-fadeInLeft">
            <h1 className="text-xl md:text-3xl font-bold sm:text-4xl">
              Transform Your Portfolio with
            </h1>
            <h1 className="text-xl md:text-3xl font-bold sm:text-4xl my-1">
              askAlfred's Expert Insights!
            </h1>
            <p>
              Unleash the potential of your crypto investments with askAlfred.
              Our AI-driven predictions make sure you're making the smartest
              moves to grow your portfolio like never before
            </p>
          </div>
        </div>
      </div>
      <div className="h-full bg-slate-950">
        <div className="w-full text-center p-40">
          <h1 className="text-white text-5xl">Predict and Swap tokens on </h1>
          <h1 className="text-white text-5xl mt-10">Multiple networks</h1>
        </div>
        <div className="flex justify-center " style={{ paddingBottom: 20 }}>
          <div
            className="grid grid-rows-2 grid-flow-col gap-2"
            style={{ width: 1200 }}
          >
            {networks.map((network) => {
              return (
                <div class="flex flex-col text-white items-center text-center">
                  <img src={`/${network}.webp`} style={{ height: 100 }} />
                  <h1>{network}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
