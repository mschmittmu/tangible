import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, publicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'UHfQXhob-KMl9xGr1LuJA9C7G-eBr4c8' }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Tangible Tokenz',
  projectId: '76b20280a5c75f0058820ce00b51fd3c',
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
