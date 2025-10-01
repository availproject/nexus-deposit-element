/**
 * Uncomment lines after installing any Nexus Element
 * @from https://elements.nexus.availproject.org/
 */

// import { useAccount } from "wagmi";
import Header from "./components/header";
// import NexusProvider, { useNexus } from "./components/nexus/NexusProvider";
// import UnifiedBalance from "./components/unified-balance/unified-balance";
// import type { EthereumProvider } from "@avail-project/nexus-core";
// import { Button } from "./components/ui/button";
// import { LoaderPinwheelIcon } from "lucide-react";
// import { Label } from "./components/ui/label";

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
    <div className="w-full min-h-screen">
      <Header />
      <div className="flex flex-col gap-y-4 items-center justify-center w-full min-h-screen border border-border">
        <p className="text-center text-2xl font-bold">
          Nexus Elements Template
        </p>
        <a
          href="https://elements.nexus.availproject.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-center text-xl font-semibold text-blue-400 underline">
            Insall Nexus Elements
          </p>
        </a>

        {/*{!nexusSDK && status === "connected" && (
          <Button onClick={init}>
            {loading ? (
              <LoaderPinwheelIcon className="size-5 animate-spin" />
            ) : (
              "Initialize Nexus"
            )}
          </Button>
        )}*/}
        {/*{nexusSDK && (
          <div className="w-full flex flex-col items-center gap-y-3">
            <Label className="w-fit font-semibold text-xl">
              Unified Balance
            </Label>
            <UnifiedBalance />
          </div>
        )}*/}
        {/*{nexusSDK && (
          <div className="w-full flex flex-col items-center gap-y-3">
            <Label className="w-fit font-semibold text-xl">
              Fast Bridge
            </Label>
            <FastBridge connectedAddress={address} />
          </div>
        )}*/}
      </div>
    </div>
  );
}

export default App;
