import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  type Theme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  scroll,
  polygon,
  optimism,
  arbitrum,
  base,
  avalanche,
  sophon,
  kaia,
  sepolia,
  baseSepolia,
  arbitrumSepolia,
  optimismSepolia,
  polygonAmoy,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import NexusProvider from "@/components/nexus/NexusProvider";

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const rainbowKitTheme: Theme = {
  colors: {
    accentColor: "var(--primary)",
    accentColorForeground: "var(--primary-foreground)",
    actionButtonBorder: "var(--border)",
    actionButtonBorderMobile: "var(--border)",
    actionButtonSecondaryBackground: "var(--secondary)",
    closeButton: "var(--muted-foreground)",
    closeButtonBackground: "var(--muted)",
    connectButtonBackground: "var(--card)",
    connectButtonBackgroundError: "var(--destructive)",
    connectButtonInnerBackground: "var(--card)",
    connectButtonText: "var(--card-foreground)",
    connectButtonTextError: "var(--primary-foreground)",
    connectionIndicator: "var(--primary)",
    downloadBottomCardBackground: "var(--card)",
    downloadTopCardBackground: "var(--card)",
    error: "var(--destructive)",
    generalBorder: "var(--border)",
    generalBorderDim: "var(--input)",
    menuItemBackground: "var(--muted)",
    modalBackdrop: "rgba(0, 0, 0, 0.45)",
    modalBackground: "var(--card)",
    modalBorder: "var(--border)",
    modalText: "var(--foreground)",
    modalTextDim: "var(--muted-foreground)",
    modalTextSecondary: "var(--muted-foreground)",
    profileAction: "var(--background)",
    profileActionHover: "var(--muted)",
    profileForeground: "var(--card)",
    selectedOptionBorder: "var(--primary)",
    standby: "var(--primary)",
  },
  fonts: {
    body: `var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif)`,
  },
  radii: {
    actionButton: "0px",
    connectButton: "0px",
    menuButton: "0px",
    modal: "0px",
    modalMobile: "0px",
  },
  shadows: {
    connectButton: "0 1px 2px rgba(0, 0, 0, 0.08)",
    dialog: "0 16px 40px rgba(0, 0, 0, 0.24)",
    profileDetailsAction: "0 1px 2px rgba(0, 0, 0, 0.08)",
    selectedOption: "0 1px 3px rgba(0, 0, 0, 0.15)",
    selectedWallet: "0 1px 3px rgba(0, 0, 0, 0.15)",
    walletLogo: "0 1px 3px rgba(0, 0, 0, 0.15)",
  },
  blurs: {
    modalOverlay: "blur(0px)",
  },
};

const config = getDefaultConfig({
  appName: "Nexus Elements",
  projectId: walletConnectProjectId,
  chains: [
    mainnet,
    base,
    sophon,
    kaia,
    arbitrum,
    avalanche,
    optimism,
    polygon,
    scroll,
    sepolia,
    baseSepolia,
    arbitrumSepolia,
    optimismSepolia,
    polygonAmoy,
  ],
});

const queryClient = new QueryClient();

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={rainbowKitTheme}>
          <NexusProvider
            config={{
              network: "mainnet",
              debug: true,
            }}
          >
            {children}
          </NexusProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
