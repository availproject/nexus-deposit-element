import {
  CHAIN_METADATA,
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  type EthereumProvider,
} from "@avail-project/nexus-core";
import { LoaderPinwheelIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { type Abi, encodeFunctionData } from "viem";
import { useAccount, useConnectorClient } from "wagmi";
import NexusDeposit from "./components/deposit/nexus-deposit";
import { useNexus } from "./components/nexus/NexusProvider";
import { Button } from "./components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const DESTINATION_CHAIN_ID = SUPPORTED_CHAINS.MEGAETH;
const DESTINATION_TOKEN_SYMBOL = "USDM" as const;
const DESTINATION_TOKEN_ADDRESS =
  TOKEN_CONTRACT_ADDRESSES["USDM"][DESTINATION_CHAIN_ID];
const AAVE_V3_POOL_ADDRESS =
  "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5" as const;

function App() {
  const { connector, status } = useAccount();
  const { data: walletClient } = useConnectorClient();
  const { handleInit, nexusSDK, loading, fetchSwapBalance } = useNexus();

  const initNexus = useCallback(async () => {
    if (status !== "connected") return;

    try {
      const mobileProvider = walletClient
        ? ({
            request: (args: unknown) => walletClient.request(args as never),
          } as EthereumProvider)
        : undefined;
      const desktopProvider = (await connector?.getProvider()) as
        | EthereumProvider
        | undefined;
      const provider = mobileProvider ?? desktopProvider;

      if (!provider || typeof provider.request !== "function") return;
      await handleInit(provider);
    } catch (error) {
      console.error("Error initializing Nexus:", error);
    }
  }, [connector, handleInit, status, walletClient]);

  useEffect(() => {
    if (status !== "connected" || nexusSDK || loading) return;
    void initNexus();
  }, [initNexus, loading, nexusSDK, status]);

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex flex-col gap-y-4 items-center justify-center w-full flex-1 border-t border-border overflow-x-hidden p-16">
        {!nexusSDK && status === "connected" && (
          <Button onClick={initNexus} disabled={loading}>
            {loading ? (
              <LoaderPinwheelIcon className="size-5 animate-spin" />
            ) : (
              "Deposit with Nexus"
            )}
          </Button>
        )}

        {nexusSDK && (
          <div className="w-full max-w-md">
            <NexusDeposit
              embed
              heading="Deposit USDm on Aave Megaeth"
              destination={{
                chainId: DESTINATION_CHAIN_ID,
                tokenAddress: DESTINATION_TOKEN_ADDRESS,
                tokenSymbol: DESTINATION_TOKEN_SYMBOL,
                tokenDecimals: 18,
                tokenLogo:
                  "https://raw.githubusercontent.com/availproject/nexus-assets/main/tokens/usdm/logo.png",
                label: "Deposit USDm on Aave Megaeth",
                estimatedTime: "~30s",
                depositTargetLogo: "/aave.svg",
                gasTokenSymbol:
                  CHAIN_METADATA[DESTINATION_CHAIN_ID].nativeCurrency.symbol,
                explorerUrl:
                  CHAIN_METADATA[DESTINATION_CHAIN_ID].blockExplorerUrls[0],
              }}
              executeDeposit={(
                _tokenSymbol,
                tokenAddress,
                amount,
                _chainId,
                user,
              ) => {
                const abi: Abi = [
                  {
                    inputs: [
                      {
                        internalType: "address",
                        name: "asset",
                        type: "address",
                      },
                      {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                      },
                      {
                        internalType: "address",
                        name: "onBehalfOf",
                        type: "address",
                      },
                      {
                        internalType: "uint16",
                        name: "referralCode",
                        type: "uint16",
                      },
                    ],
                    name: "supply",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                  },
                ];
                const data = encodeFunctionData({
                  abi,
                  functionName: "supply",
                  args: [tokenAddress, amount, user, 0],
                });

                return {
                  to: AAVE_V3_POOL_ADDRESS,
                  data,
                  tokenApproval: {
                    token: tokenAddress,
                    amount,
                    spender: AAVE_V3_POOL_ADDRESS,
                  },
                };
              }}
              onSuccess={() => {
                void fetchSwapBalance();
              }}
              onError={(message) => {
                console.error("Deposit failed:", message);
              }}
            />
          </div>
        )}
        {status !== "connected" && <ConnectButton />}
      </main>
    </div>
  );
}

export default App;
