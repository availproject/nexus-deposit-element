"use client";

import {
  CHAIN_METADATA,
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
  type EthereumProvider,
} from "@avail-project/nexus-core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LoaderPinwheelIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { type Abi, encodeFunctionData } from "viem";
import { useAccount, useConnectorClient } from "wagmi";
import { useNexus } from "../nexus/NexusProvider";
import { Button } from "../ui/button";
import NexusDeposit from "./nexus-deposit";

interface DepositElementProps {
  showInlineConnectButton?: boolean;
}

const DESTINATION_CHAIN_ID = SUPPORTED_CHAINS.ARBITRUM;
const DESTINATION_TOKEN_SYMBOL = "USDT" as const;
const DESTINATION_TOKEN_ADDRESS =
  TOKEN_CONTRACT_ADDRESSES[DESTINATION_TOKEN_SYMBOL][DESTINATION_CHAIN_ID];
const AAVE_V3_POOL_ADDRESS =
  "0x794a61358D6845594F94dc1DB02A252b5b4814aD" as const;

const DEPOSIT_ABI: Abi = [
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

const DepositElement = ({
  showInlineConnectButton = true,
}: DepositElementProps) => {
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

  if (status !== "connected") {
    if (!showInlineConnectButton) {
      return (
        <p className="text-center text-sm text-muted-foreground">
          Connect your wallet to continue.
        </p>
      );
    }
    return (
      <ConnectButton
        showBalance={false}
        chainStatus="none"
        accountStatus="avatar"
      />
    );
  }

  if (!nexusSDK) {
    return (
      <Button onClick={initNexus} disabled={loading}>
        {loading ? (
          <LoaderPinwheelIcon className="size-5 animate-spin" />
        ) : (
          "Initialize Nexus"
        )}
      </Button>
    );
  }

  return (
    <div className="w-full max-w-md">
      <NexusDeposit
        embed
        heading="Deposit USDT"
        destination={{
          chainId: DESTINATION_CHAIN_ID,
          tokenAddress: DESTINATION_TOKEN_ADDRESS,
          tokenSymbol: DESTINATION_TOKEN_SYMBOL,
          tokenDecimals: TOKEN_METADATA[DESTINATION_TOKEN_SYMBOL].decimals,
          tokenLogo: TOKEN_METADATA[DESTINATION_TOKEN_SYMBOL].icon,
          label: "on Aave v3",
          estimatedTime: "~30s",
          gasTokenSymbol: CHAIN_METADATA[DESTINATION_CHAIN_ID].nativeCurrency.symbol,
          explorerUrl: CHAIN_METADATA[DESTINATION_CHAIN_ID].blockExplorerUrls[0],
        }}
        executeDeposit={(_tokenSymbol, tokenAddress, amount, _chainId, user) => {
          const data = encodeFunctionData({
            abi: DEPOSIT_ABI,
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
  );
};

export default DepositElement;
