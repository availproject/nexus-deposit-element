import DepositElement from "./components/deposit/deposit-element";

function App() {
  return (
    <main className="min-h-dvh w-full flex items-center justify-center p-0 sm:p-4">
      <DepositElement showInlineConnectButton />
    </main>
  );
}

export default App;
