/**
 * Uncomment lines after installing any Nexus Element
 * @from https://elements.nexus.availproject.org/
 */

import Header from "./components/header";
// import { Button } from "./components/ui/button";
// import { LoaderPinwheelIcon } from "lucide-react";
// import { Label } from "./components/ui/label";
// import { useNexus } from "./components/nexus/NexusProvider";
// import { useAccount } from "wagmi";
// import { encodeFunctionData, parseUnits, type Abi } from "viem";
// import UnifiedBalance from "./components/unified-balance/unified-balance";
// import {
//   SUPPORTED_CHAINS,
//   TOKEN_CONTRACT_ADDRESSES,
//   TOKEN_METADATA,
//   type EthereumProvider,
// } from "@avail-project/nexus-core";
// import NexusDeposit from "./components/deposit/deposit";
// import FastBridge from "./components/fast-bridge/fast-bridge";

function App() {
  // const { connector, status, address } = useAccount();
  // const { handleInit, nexusSDK, loading } = useNexus();

  // const init = async () => {
  //   try {
  //     const provider = (await connector?.getProvider()) as EthereumProvider;
  //     await handleInit(provider);
  //   } catch (error) {
  //     console.error("Error initializing Nexus:", error);
  //   }
  // };

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex flex-col gap-y-4 items-center justify-center w-full flex-1 border-t border-border overflow-x-hidden p-16">
        <p className="text-center text-2xl font-bold">
          Nexus Elements Template
        </p>
        <a
          href="https://elements.nexus.availproject.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-center text-xl font-semibold text-primary underline">
            Install Nexus Elements
          </p>
        </a>

        {/* {!nexusSDK && status === "connected" && (
          <Button onClick={init}>
            {loading ? (
              <LoaderPinwheelIcon className="size-5 animate-spin" />
            ) : (
              "Initialize Nexus"
            )}
          </Button>
        )} */}
        <div className="flex items-start gap-x-4 w-full max-w-6xl">
          {/* {nexusSDK && (
            <div className="w-full flex flex-col items-center gap-y-3">
              <Label className="w-fit font-semibold text-xl">
                Unified Balance
              </Label>
              <UnifiedBalance />
            </div>
          )} */}
          {/* {nexusSDK && address && (
            <div className="w-full flex flex-col items-center gap-y-3">
              <Label className="w-fit font-semibold text-xl">Fast Bridge</Label>
              <FastBridge connectedAddress={address} />
            </div>
          )} */}
          {/* {nexusSDK && address && (
            <div className="w-full flex flex-col items-center gap-y-3">
              <Label className="w-fit font-semibold text-xl">
                Nexus Deposit
              </Label>
              <NexusDeposit
                address={address ?? `0x`}
                token="USDT"
                chain={SUPPORTED_CHAINS.ARBITRUM}
                destinationLabel="on Aave v3"
                heading="Deposit USDT"
                depositExecute={(token, amount, _chainId, user) => {
                  const contractAddress =
                    "0x794a61358D6845594F94dc1DB02A252b5b4814aD" as const;
                  const abi: Abi = [
                    {
                      name: "supply",
                      type: "function",
                      stateMutability: "nonpayable",
                      inputs: [
                        { name: "asset", type: "address" },
                        { name: "amount", type: "uint256" },
                        { name: "onBehalfOf", type: "address" },
                        { name: "referralCode", type: "uint16" },
                      ],
                      outputs: [],
                    },
                  ];
                  const decimals = TOKEN_METADATA[token].decimals;
                  const amountWei = parseUnits(amount, decimals);
                  if (token === "ETH") {
                    throw new Error(
                      "ETH is native and not supported for this execute builder"
                    );
                  }
                  const chainMap = TOKEN_CONTRACT_ADDRESSES[token];
                  if (!(_chainId in chainMap)) {
                    throw new Error(
                      "Selected chain is not supported for this token"
                    );
                  }
                  const tokenAddr = chainMap[_chainId as keyof typeof chainMap];
                  const encoded = encodeFunctionData({
                    abi: abi,
                    functionName: "supply",
                    args: [tokenAddr, amountWei, user, 0],
                  });
                  if (!encoded) {
                    throw new Error("Failed to encode contract call");
                  }
                  return {
                    to: contractAddress,
                    data: encoded,
                    tokenApproval: {
                      token,
                      amount: amountWei,
                      spender: contractAddress,
                    },
                  };
                }}
              />
            </div>
          )} */}
        </div>
      </main>
    </div>
  );
}

export default App;
