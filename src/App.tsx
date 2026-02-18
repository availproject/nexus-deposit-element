import DepositElement from "./components/deposit/deposit-element";
import Header from "./components/header";

const EMBED_DEPOSIT_PATH = "/embed/deposit";

const isDepositEmbedPath = (pathname: string) =>
  pathname === EMBED_DEPOSIT_PATH || pathname.startsWith(`${EMBED_DEPOSIT_PATH}/`);

function App() {
  const pathname = window.location.pathname;
  const embedMode = isDepositEmbedPath(pathname);

  if (embedMode) {
    return (
      <main className="min-h-dvh w-full flex items-center justify-center p-0 sm:p-4">
        <DepositElement showInlineConnectButton />
      </main>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex flex-col gap-y-4 items-center justify-center w-full flex-1 border-t border-border overflow-x-hidden p-6 sm:p-16">
        <p className="text-center text-2xl font-bold">Nexus Deposit Demo</p>
        <p className="text-center text-muted-foreground">
          Deposit element only. Use <code>/embed/deposit</code> for iframe embedding.
        </p>
        <DepositElement showInlineConnectButton={false} />
      </main>
    </div>
  );
}

export default App;
