## Nexus Elements Template — Quick Start

Set up this template, add Nexus Elements, and run the app locally.

### Prerequisites

- **Node.js** 18+
- Install project dependencies
- A WalletConnect Project ID (create one in WalletConnect Cloud)

### 1) Install dependencies

```bash
pnpm i
```

### 2) Add Nexus Elements (choose one or both)

- Fast Bridge

```bash
pnpm dlx shadcn@latest add https://elements.nexus.availproject.org/r/fast-bridge.json
```

- Unified Balance

```bash
pnpm dlx shadcn@latest add https://elements.nexus.availproject.org/r/unified-balance.json
```

You can add either element or both. See the [Nexus Elements gallery](https://elements.nexus.availproject.org/) for details.

### 3) Configure environment

Create a `.env` file in the project root:

```bash
cp .env.example .env  # if present; otherwise create a new .env
```

Add:

```bash
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### 4) Enable the Nexus provider

After installing at least one element, enable the Nexus provider in `src/providers/Web3Provider.tsx`:

- Uncomment the `NexusProvider` import.
- Uncomment the `NexusProvider` wrapper around `{children}` and keep the provided `config` (you can adjust `network` or `debug` later).

This ensures the app has access to the Nexus SDK.

### 5) Wire up the app components

Open `src/App.tsx` and:

- Uncomment the `useAccount` import from `wagmi`.
- Uncomment the `useNexus` import from `components/nexus/NexusProvider`.
- If you added Unified Balance, uncomment its import and the “Unified Balance” JSX block.
- If you added Fast Bridge, import the generated Fast Bridge component as added by the element installer, then uncomment the “Fast Bridge” JSX block.
- Optionally uncomment the “Initialize Nexus” button block to initialize the SDK after connecting a wallet.

The file already contains commented code and notes showing exactly what to enable. Start by enabling items in `Web3Provider.tsx`, then enable the corresponding bits in `App.tsx`.

### 6) Run the app

```bash
pnpm dev
```

Open the URL shown in your terminal. Connect your wallet via the RainbowKit button. If you left the init button enabled, click “Initialize Nexus” to start the SDK, then use the installed element(s).

### 7) Embed only the Deposit element

This app renders the deposit element directly on the root path:

`/`

Example local URL:

`http://localhost:5173/`

Use it from `availproject.org` with an iframe:

```html
<iframe
  src="https://<your-deployed-domain>/"
  title="Nexus Deposit"
  style="width: 100%; max-width: 420px; min-height: 640px; border: 0;"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

If you want wallet extension support to be most reliable, host this on a trusted first-party Avail domain/subdomain.

### Project scripts

- **dev**: start the Vite dev server
- **build**: production build
- **preview**: preview the production build locally

For more elements and usage examples, visit the [Nexus Elements gallery](https://elements.nexus.availproject.org/).
