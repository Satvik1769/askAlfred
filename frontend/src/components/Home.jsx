import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const Card = ({ discordId, xId, githubId, name, text, imageNumber }) => {
  return (
    <section class="lg:w-[430px] md:max-w-[400px] my-10 h-full ml-12 relative bg-[#231f39]/60 rounded-[6px] shadow-[0px_15px_39px_16px_rgba(52,45,91,0.65)] backdrop-blur-sm mx-2 overflow-hidden">
      <a href={`https://github.com/${githubId}`} target="_blank" class="">
        <img
          src={`https://avatars.githubusercontent.com/u/${imageNumber}?v=4`}
          class="rounded-full w-[120px] mx-auto my-10 p-0 border-[6px] box-content border-[#231f39] shadow-[0px_27px_16px_-11px_rgba(31,27,56,0.25)] transition-all duration-150 ease-in hover:scale-105 cursor-pointer slide-in-elliptic-top-fwd"
        />
      </a>
      <h1 class="text-xl font-bold text-center">{name}</h1>
      <small class="block my-1 text-center">Full Stack Developer</small>
      <div className="p-10">
        <p class="mt-5 ">{text}</p>
      </div>

      <div class="bg-[#1e1a36]/70 p-4 text-sm font-semibold backdrop-blur-sm">
        <p>Socials</p>
        <div class="sm:flex sm:items-center sm:justify-between p-2">
          <div class="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href={`https://discordapp.com/users/${discordId}`}
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span class="sr-only">Discord</span>
            </a>
            <a
              href={`https://x.com/${xId}`}
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Twitter page</span>
            </a>
            <a
              href={`https://github.com/${githubId}`}
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <div class=" bg-[#292240] flex flex-col  items-center p-10 min-h-screen text-[#9e9cb6]">
      <h1 className="text-white text-2xl mb-10">Made by Software Craftsmen</h1>
      <div className="flex flex-col lg:flex-row ">
        <Card
          discordId={"Satvik9521"}
          xId={"SatvikManchanda"}
          githubId={"Satvik1769"}
          name={"Satvik Manchanda"}
          text={` A sportsman at heart who likes to build things that make a difference.
          If not coding, you can find him playing badminton or video games.`}
          imageNumber={"101499823"}
        />

        <Card
          discordId={"Satvik9521"}
          xId={"SatvikManchanda"}
          githubId={"rudy20003"}
          name={"Rudraksh Pande"}
          text={` A sportsman at heart who likes to build things that make a difference.
          If not coding, you can find him playing badminton or video games.`}
          imageNumber={"101493079"}
        />
      </div>
    </div>
  );
};

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
  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Portfolio", href: "#", current: false },
    { name: "Swap", href: "/SwapInterface", current: false },
    { name: "Predict", href: "/predict", current: false },
  ];

  return (
    <div className="relative">
      <NavigationBar navigation={navigation} />
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
          <div className="flex lg:max-w-[600px] md:w-full justify-center">
            <img
              src="/alfred2.png"
              alt="Alfred the butler"
              className="lg:w-[300px] md:w-[200px] animate-fadeInRight "
            />
          </div>
        </div>
        <div
          className="flex flex-col-reverse lg:flex-row  justify-center lg:items-center w-full mt-20"
          style={{ height: "600px" }}
        >
          <div className="flex justify-center">
            <img
              src="/portfolio.webp"
              alt="Portfolio"
              className=" mt-20 w-400 lg:h-200 md:w-200 animate-fadeInLeft "
              style={{ height: "350px", width: "600px" }}
            />
          </div>

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
      <div className=" h-full lg:h-screen bg-slate-950 ">
        <div className="w-full text-center p-10 md:p-40 ">
          <h1 className="text-white text-xl md:text-4xl font-bold lg:text-5xl">
            Predict and Swap tokens on
          </h1>
          <h1 className="text-white text-xl md:text-4xl font-bold lg:text-5xl mt-10">
            Multiple networks
          </h1>
        </div>
        <div className="flex justify-center " style={{ paddingBottom: 20 }}>
          <div
            className="grid grid-rows-4 grid-flow-col gap-4 md:grid-rows-3 md:gap-3 lg:grid-rows-2 lg:gap-2"
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
      <Footer />
    </div>
  );
};

export default Home;
