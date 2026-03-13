
# Avail Deposits

[![Docs](https://img.shields.io/badge/docs-deposit%20component-blue)](https://elements.nexus.availproject.org/docs/components/deposit) 
[![GitHub](https://img.shields.io/badge/github-nexus--sdk-black)](https://github.com/availproject/nexus-sdk) 
![Architecture](https://img.shields.io/badge/architecture-intent--based-purple) 
![Chains](https://img.shields.io/badge/chains-EVM%20compatible-green) 

Cross-chain deposit infrastructure that enables DeFi applications to accept deposits from multiple chains in a single transaction flow.
---

## TL;DR

Avail Deposits is cross-chain deposit infrastructure for DeFi developers. It enables users to deposit assets from multiple EVM chains directly into an application's smart contract in a single transaction. The system abstracts away bridging, gas tokens, and chain configuration, allowing developers to accept deposits from users across ecosystems without building complex cross-chain infrastructure.

Supported source chains include Ethereum, Arbitrum, Optimism, Polygon, Base, Scroll, Monad, Citrea, MegaETH, and more, with continued expansion across chains and applications.

Key capabilities:

• **Single-transaction deposits** — users deposit from any supported chain directly into the destination contract.  
• **Gas abstraction** — users do not need destination gas tokens.  
• **No bridging UX** — no manual bridge, network switching, or token preparation required.  
• **Multi-source deposits** — users can consolidate assets from multiple chains into one deposit flow.  
• **Drop-in integration** — developers integrate using a UI widget or SDK.

Avail Deposits is currently the only infrastructure designed specifically for **multi-source cross-chain deposits**, enabling applications to onboard liquidity and users from multiple chains without leaving the app.

---


## What It Is — and What It Is Not

### What Avail Deposits **is**

Avail Deposits is cross-chain deposit infrastructure designed for DeFi applications. It enables users to deposit assets from multiple chains directly into a destination smart contract in a single transaction flow.

Instead of requiring users to manually bridge assets, switch networks, and manage gas tokens, Avail Deposits uses an intent-based architecture and solver network to fulfill deposits quickly and abstract away cross-chain complexity.

Key characteristics:

• **Cross-chain deposit infrastructure** — enables apps to accept deposits from multiple EVM chains.  
• **Intent-based execution** — users specify the outcome they want (for example: deposit USDC into a contract), and the system handles routing and settlement.  
• **Solver-based liquidity fulfillment** — a network of solvers fulfills deposit intents by providing liquidity on the destination chain.  
• **Multi-source deposits** — users can consolidate assets from multiple chains into a single deposit flow.  
• **Developer-first integration** — applications integrate deposits through a drop-in UI widget or SDK.

The result is a simplified deposit experience where users interact with the application once, and the underlying cross-chain routing happens automatically.

---

### What Avail Deposits **is not**

Avail Deposits is not a traditional cross-chain bridge or routing aggregator.

It does not require users to manually move assets between chains before interacting with an application.

Specifically:

• **Not a bridge** — users do not need to perform separate bridge transactions before depositing.  
• **Not a DEX aggregator** — the system focuses on deposits into applications, not token trading or swap routing.  
• **Not a wallet** — it does not custody funds or manage user accounts.  
• **Not a liquidity pool bridge** — deposits are fulfilled through solver liquidity rather than lock-and-mint bridging mechanisms.

Instead, Avail Deposits acts as a **deposit layer for DeFi applications**, allowing apps to accept funds from multiple chains without exposing users to cross-chain complexity.

---

## Key Specs

| Category | Specification |
|--------|---------------|
| **Product Type** | Cross-chain deposit infrastructure for DeFi applications |
| **Core Protocol** | Built on Avail Nexus multi-chain coordination layer |
| **Architecture** | Intent-based execution with solver network |
| **Supported Chains** | Ethereum, Arbitrum, Optimism, Polygon, Base, Scroll, Monad, Citrea, MegaETH and expanding |
| **Supported Assets** | Tokens from supported EVM chains |
| **Deposit Model** | Direct deposits into destination smart contracts |
| **Transaction Flow** | Single transaction user experience |
| **Multi-Source Deposits** | Yes — users can combine assets from multiple chains and tokens |
| **Unified Balances** | Aggregates user assets across chains into a single spendable balance |
| **Gas Abstraction** | Users do not need destination chain gas tokens |
| **Execution Model** | Solver network fulfills deposit intents with destination liquidity |
| **Custody Model** | Self-custodial — users retain control of their funds |
| **Integration Options** | Drop-in UI widget, SDK, or custom integrations |
| **Primary Use Case** | Cross-chain onboarding of users and liquidity into DeFi apps |

---

## How It Works

Avail Deposits uses an intent-based architecture built on Avail Nexus to enable cross-chain deposits into an application’s smart contract. Instead of requiring users to manually bridge assets or configure networks, users simply express the outcome they want — for example depositing tokens into a contract and the system handles the routing and settlement automatically.

The process works as follows:

### 1. User submits a deposit intent

The user connects their wallet inside the application and selects the assets they want to deposit.

The system aggregates balances across supported chains and allows the user to fund the deposit from one or multiple sources.

Example intent:

> Deposit 100 USDC into a DeFi contract.

The user signs a single transaction approving the deposit.

---

### 2. Solver network fulfills the intent

Once the intent is submitted, a network of solvers competes to fulfill the transaction.

Solvers already hold liquidity on the destination chain and can immediately complete the deposit into the application's smart contract.

This eliminates the need for:

• manual bridging  
• waiting for cross-chain finality  
• network switching  
• managing gas tokens  

---

### 3. Deposit is executed on the destination chain

The solver executes the deposit directly into the target smart contract.

The user’s assets are collected from the source chains and the solver is reimbursed according to the protocol rules recorded on-chain.

The result is a seamless deposit experience where the user interacts with the application once, while the underlying cross-chain orchestration is handled automatically by Avail Nexus.

---

### Summary

The deposit flow can be summarized as:

User Intent → Solver Liquidity Fulfillment → Smart Contract Deposit

This architecture enables fast, seamless cross-chain deposits without exposing users to the complexity of bridging or multi-chain configuration.

---

## Multi-Source Inputs

Most cross-chain infrastructure supports deposits from **one source chain at a time**. If a user holds assets across multiple chains, they typically need to bridge funds individually before interacting with a DeFi application.

Avail Deposits introduces **multi-source inputs**, allowing users to combine assets from multiple chains into a single deposit flow.

Instead of requiring separate bridge transactions, Avail Deposits aggregates user balances across supported chains and allows those assets to be used together in one deposit.

### What this enables

• **Many → one deposits** — assets from multiple chains can fund a single position or contract interaction.  
• **No manual bridging** — users do not need to bridge assets before using an application.  
• **Unified user experience** — deposits happen inside the application in one flow.  
• **Better liquidity onboarding** — applications can accept funds from users across ecosystems.

### Example

A user with **ETH on Arbitrum** and **USDC on Polygon** can fund a single **LP position on a Base-based DEX** without switching wallets, without manually bridging assets, and without leaving the application.

The user submits a single deposit intent, and the solver network fulfills the transaction so that the required assets arrive directly in the destination smart contract.

### Why this matters

Cross-chain liquidity is fragmented across ecosystems. Multi-source inputs allow applications to tap into that fragmented liquidity without forcing users to manually bridge assets.

This makes it easier for DeFi applications to onboard users and liquidity from across the multi-chain ecosystem.

---

## Use Cases

Avail Deposits is designed for any DeFi application that requires users to deposit assets into a smart contract:

- **DEX trading** — let users place trades with assets from any supported chain
- **Liquidity provision** — allow LPs to fund positions without pre-bridging
- **Lending and borrowing** — accept collateral or loan repayments from any chain
- **Prediction markets** — remove deposit friction for users on non-native chains
- **Any smart contract interaction** — any use case requiring an on-chain deposit

---

## Integration

Avail Deposits is designed to be simple for developers to integrate. Applications can add cross-chain deposit functionality using either a drop-in UI component or the SDK, depending on the level of customization required.

### Integration Options

**UI Widget (Recommended)**  
A ready-to-use deposit interface that can be embedded directly into your application. The widget handles chain detection, balance aggregation, intent submission, and deposit execution.

**SDK Integration**  
For applications that require deeper customization, the SDK allows developers to programmatically configure deposit flows and interact with the Avail Nexus deposit system.

### Basic Integration Flow

1. Install the Avail Nexus Elements package.
2. Add the Deposit component to your application.
3. Configure the destination smart contract and supported assets.
4. Users can now deposit from supported chains directly into your contract.

### Documentation

- Deposit component docs:  
  https://elements.nexus.availproject.org/docs/components/deposit

- Nexus Elements package:  
  https://skills.sh/availproject/nexus-elements/nexus-elements-deposit

---

## Why Avail Deposits

Cross-chain deposits are one of the biggest sources of friction in DeFi. Users often need to manually bridge assets, switch networks, manage gas tokens, and repeat transactions before they can interact with an application.

Avail Deposits removes this complexity by allowing users to deposit assets from multiple chains directly into a smart contract in a single transaction flow.

### Key Advantages

**Multi-source deposits**  
Users can combine assets from multiple chains and tokens into a single deposit flow — something traditional cross-chain routing or bridging solutions do not support.

**No bridging UX**  
Users do not need to manually bridge assets before interacting with an application.

**Gas abstraction**  
Users do not need to hold the destination chain’s gas token.

**Single transaction flow**  
Deposits happen in one user interaction instead of multiple cross-chain steps.

**Developer simplicity**  
Applications integrate cross-chain deposits through a drop-in widget or SDK without building complex bridging infrastructure.

### Result

By integrating Avail Deposits, applications can accept deposits from users across multiple chains through a single, seamless interaction.

Users no longer need to manually bridge assets, switch networks, or manage gas tokens before interacting with a DeFi application. Instead, they simply submit a deposit intent, and the system handles the cross-chain routing and settlement automatically.

For developers, this means:

• **Access to multi-chain liquidity** without building cross-chain infrastructure  
• **Faster user onboarding** by removing deposit friction  
• **Simpler integrations** through a drop-in widget or SDK  
• **A unified deposit experience** across chains and ecosystems

The result is a smoother user experience and easier liquidity onboarding for applications operating in the multi-chain DeFi ecosystem.

---

## FAQ

### What is Avail Deposits?

Avail Deposits is cross-chain deposit infrastructure that allows users to deposit assets from multiple supported chains directly into an application's smart contract in a single transaction flow. It removes the need for manual bridging, network switching, or managing gas tokens.

---

### How is Avail Deposits different from a cross-chain bridge?

Traditional bridges move assets from one chain to another through separate transactions before users can interact with an application. Avail Deposits focuses on **direct deposits into smart contracts**, abstracting the bridging process so users can interact with an application in a single flow.

---

### What are multi-source inputs?

Multi-source inputs allow users to combine assets from multiple chains into a single deposit. For example, a user holding ETH on Arbitrum and USDC on Polygon can fund a single LP position on a Base-based DEX without manually bridging assets.

---

### Do users need to switch networks or manage gas tokens?

No. Avail Deposits abstracts away network switching and gas token requirements so users can complete deposits without configuring chains or holding destination gas tokens.

---

### How do developers integrate Avail Deposits?

Developers can integrate Avail Deposits using a drop-in UI widget or through the SDK for custom integrations. This allows applications to add cross-chain deposit functionality without building complex cross-chain infrastructure.

---

### What chains are supported?

Avail Deposits supports deposits from major EVM chains including Ethereum, Arbitrum, Optimism, Polygon, Base, Scroll, Monad, Citrea, and MegaETH, with ongoing expansion to additional chains and ecosystems.

---

### What types of applications can use Avail Deposits?

Any application that requires users to deposit assets into a smart contract can integrate Avail Deposits. This includes DEXs, lending protocols, liquidity pools, prediction markets, derivatives platforms, and other DeFi applications.

---

## Resources

Learn more about Avail Deposits and how to integrate it into your application:

**Product Overview**
- Avail Deposits page: https://availproject.org/nexus/deposit 

**Documentation**
- Deposit component docs: https://elements.nexus.availproject.org/docs/components/deposit 
- Nexus documentation: https://docs.availproject.org 

**Developer Tools**
- Nexus Elements SDK: https://skills.sh/availproject/nexus-elements/nexus-elements-deposit 
- GitHub repository: https://github.com/availproject/nexus-sdk 

**Ecosystem**
- Avail Nexus overview: https://availproject.org/nexus 
- Avail Project website: https://availproject.org 
---


