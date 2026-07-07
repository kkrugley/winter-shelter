"use client"

import { useState } from "react"
import { Copy, Check, CurrencyEth, Coffee } from "@phosphor-icons/react"
import { DialogRoot, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import posthog from "posthog-js"

// ── Inline SVG иконки платёжных систем ────────────────────────────────────

function TonIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <path
        d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#0098EA"
      />
      <path
        d="M37.558 15.167H18.442C14.97 15.167 12.833 18.9 14.598 21.896L26.63 42.408C27.308 43.53 28.692 43.53 29.37 42.408L41.402 21.896C43.167 18.9 41.03 15.167 37.558 15.167ZM26.25 38.528L23.528 33.944L18.4 24.722H26.25V38.528ZM37.6 24.722L32.472 33.944L29.75 38.528V24.722H37.6Z"
        fill="white"
      />
    </svg>
  )
}

function BuyMeCoffeeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.077.016-.111.024l-.261.053c-1.655.34-3.34.418-5.02.368a26.404 26.404 0 01-4.831-.62c-.268-.067-.53-.138-.79-.216-.353-.106-.704-.234-1.017-.42-.464-.275-.857-.735-.54-1.26.154-.262.432-.42.696-.536.493-.217 1.037-.317 1.571-.409a23.19 23.19 0 015.518-.22c.332.025.663.063.993.11.318.046.697.131.985-.043.284-.172.348-.556.067-.703-.237-.124-.508-.153-.764-.186a18.948 18.948 0 00-5.927.105c-.6.107-1.196.252-1.78.428-.505.154-1.013.35-1.424.695-.37.31-.622.753-.655 1.24-.034.508.187.978.516 1.343.346.384.81.621 1.275.804.74.289 1.52.44 2.3.567a44.956 44.956 0 006.99.376c.926-.02 1.852-.072 2.775-.155.31-.028.618-.064.924-.107.44-.063.943-.107 1.298-.42.35-.31.386-.838.24-1.257z"
        fill="#FF813F"
      />
      <path
        d="M4.45 9.4h15.1l-1.52 9.11c-.157.94-.97 1.629-1.925 1.629H7.895c-.954 0-1.767-.688-1.925-1.629L4.45 9.4z"
        fill="#FF813F"
      />
    </svg>
  )
}

function KofiIcon({ size = 20, color = "#29ABE0" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"
        fill={color}
      />
    </svg>
  )
}

function SolanaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 397.7 311.7" fill="none">
      <linearGradient id="sol-a" x1="360.879" y1="351.455" x2="141.213" y2="-69.294" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#9945ff" />
        <stop offset=".14" stopColor="#8752f3" />
        <stop offset=".42" stopColor="#5497d5" />
        <stop offset=".68" stopColor="#43b4ca" />
        <stop offset=".88" stopColor="#28e0b9" />
        <stop offset="1" stopColor="#19fb9b" />
      </linearGradient>
      <path d="M64.6 237.9a12 12 0 018.5-3.5h317.4c5.4 0 8.1 6.5 4.3 10.3l-62.7 62.7a12 12 0 01-8.5 3.5H6.2c-5.4 0-8.1-6.5-4.3-10.3l62.7-62.7zm0-164.1a12.2 12.2 0 018.5-3.5h317.4c5.4 0 8.1 6.5 4.3 10.3L331.8 143a12 12 0 01-8.5 3.5H5.9c-5.4 0-8.1-6.5-4.3-10.3l63-62.4zM333.1 3.5A12 12 0 00324.6 0H7.2C1.8 0-.9 6.5 2.9 10.3l62.7 62.7a12 12 0 008.5 3.5h317.4c5.4 0 8.1-6.5 4.3-10.3L333.1 3.5z" fill="url(#sol-a)" />
    </svg>
  )
}

function BaseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 111 111" fill="none">
      <circle cx="55.5" cy="55.5" r="55.5" fill="#0052FF" />
      <path d="M55.39 88.27c18.15 0 32.86-14.71 32.86-32.86 0-18.15-14.71-32.86-32.86-32.86-17.18 0-31.3 13.17-32.76 29.97h43.54v5.78H22.63c1.46 16.8 15.58 29.97 32.76 29.97z" fill="white" />
    </svg>
  )
}

function TronIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF060A" />
      <path d="M23.5 11.1L8 8l7.8 17.5L26 13l-2.5-1.9zm-2.1.7l-5.6 2.2-3.4-5.2 9 3zm-8.6 9.5l-2-8.2 5.5 8.4-3.5-.2zm4.8.3l-5.1-7.8 5.9-2.3L21 15l-3.4 6.6z" fill="white" />
    </svg>
  )
}

// ── Компонент копирования адреса ──────────────────────────────────────────

function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 rounded-lg bg-paper border border-border-soft px-3 py-2">
      <span className="font-mono text-xs text-ink-muted flex-1 truncate">{address}</span>
      <button
        onClick={handleCopy}
        className="shrink-0 text-ink-muted hover:text-ink transition-colors"
        aria-label="Скопировать адрес"
      >
        {copied ? (
          <Check size={14} weight="bold" className="text-accent" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  )
}

// ── Адреса ────────────────────────────

const TON_ADDRESS = "UQA2nzI1ygl7gV3cToWa0uMwSj7T18XUkyvB7gfAzL4Us5Ep"
const SOLANA_ADDRESS = "GuZjXb6iYLNXsndCW2ZffJvJGiF8YmFqxAawyZoMRFYq"
const ETH_ADDRESS = "0x94b4D6e8e72d78590164529C8aA2bCbc668500E5"
const TRON_ADDRESS = "TBLkHSspCZuxe1XPk8GzPm2iyDiQ1SXqt8"
const BASE_ADDRESS = "0x94b4D6e8e72d78590164529C8aA2bCbc668500E5"
// ── const BITCOIN_ADDRESS = "bc1qvemeaerpzvd8xh0e6rm6n8y8zc46fyy9kws2fw"
const TON_TRANSFER_URL = "ton://transfer/UQA2nzI1ygl7gV3cToWa0uMwSj7T18XUkyvB7gfAzL4Us5Ep?text=%D0%9F%D0%BE%D0%B6%D0%B5%D1%80%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%87%D0%B5%D1%80%D0%B5%D0%B7%20%D1%81%D0%B0%D0%B9%D1%82%20%7C%20Safepaws%20Organization"
const BUYMEACOFFEE_URL = "https://buymeacoffee.com/safepawsorganization"
const KOFI_URL = "https://ko-fi.com/safepawsorganization"
const BOOSTY_URL = "https://boosty.to/safepawsorganization/donate"

// ── DonateModal ───────────────────────────────────────────────────────────

interface DonateModalProps {
  open: boolean
  onClose: () => void
}

export function DonateModal({ open, onClose }: DonateModalProps) {
  return (
    <DialogRoot open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        {/* Контейнер фиксированного размера */}
        <div
          className="relative w-full max-w-[680px] h-[440px] rounded-xl overflow-hidden shadow-[var(--shadow-lift)]"
          style={{ background: "var(--card-bg)" }}
        >
          <DialogClose />

          <Tabs
            defaultValue="bmc"
            orientation="vertical"
            className="h-full"
          >
            {/* Левая колонка — табы */}
            <div
              className="flex flex-col h-full w-48 shrink-0 pt-3 pb-3 pl-3 pr-0 gap-0.5"
              style={{ background: "var(--color-sand)" }}
            >
              {/* Заголовок */}
              <div className="px-3 pt-1 pb-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Поддержать
                </p>
              </div>

              <TabsList className="p-0 gap-0.5">
                <TabsTrigger value="ton" className="w-full justify-start data-[active]:rounded-r-none">
                  <TonIcon size={18} />
                  GRAM (prev. TON)
                </TabsTrigger>
                <TabsTrigger value="crypto" className="w-full justify-start data-[active]:rounded-r-none">
                  <CurrencyEth size={18} />
                  Криптовалюты
                </TabsTrigger>
                <TabsTrigger value="bmc" className="w-full justify-start data-[active]:rounded-r-none">
                  <BuyMeCoffeeIcon size={18} />
                  Buy Me a Coffee
                </TabsTrigger>
                <TabsTrigger value="kofi" className="w-full justify-start data-[active]:rounded-r-none">
                  <KofiIcon size={18} />
                  Ko-fi
                </TabsTrigger>
                <TabsTrigger value="boosty" className="w-full justify-start data-[active]:rounded-r-none">
                  <KofiIcon size={18} />
                  Boosty
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Правая область — контент */}
            <div className="flex-1 overflow-hidden" style={{ background: "var(--card-bg)" }}>
              {/* GRAM (prev. TON) */}
              <TabsContent value="ton" className="h-full flex flex-col items-center justify-center px-8 py-8">
                <div className="flex flex-col items-center w-full">
                  <div className="w-40 h-40 rounded-xl overflow-hidden border border-border-soft bg-paper flex items-center justify-center shrink-0">
                    <img src="/images/general/qr/ton-qr-code.png" alt="TON QR" className="w-full h-full object-cover block" onError={(e) => {
                        e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.removeAttribute("style")}} />
                    <span className="font-mono text-[10px] text-ink-muted text-center px-3" style={{ display: "none" }}>QR-код<br />кошелька<br />TON</span>
                  </div>
                  <div className="w-full max-w-[260px] space-y-2 mt-4">
                    <p className="text-xs text-ink-muted text-center">
                      GRAM (prev. TON) — быстрый перевод без комиссий
                    </p>
                    <CopyAddress address={TON_ADDRESS} />
                  </div>
                  <a
                    href={TON_TRANSFER_URL}
                    onClick={() => posthog.capture("donate_platform_clicked", { platform: "ton" })}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 mt-3"
                    style={{ background: "#0098EA" }}
                  >
                    <TonIcon size={16} />
                    Открыть в TON-кошельке
                  </a>
                </div>
              </TabsContent>

              {/* Другие крипто */}
              <TabsContent value="crypto" className="h-full flex flex-col justify-center gap-3 p-8">
                <p className="text-xs text-ink-muted mb-1">Переводы принимаются в следующих сетях:</p>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <SolanaIcon size={16} />
                      <span className="text-xs font-medium text-ink">Solana (SOL)</span>
                    </div>
                    <CopyAddress address={SOLANA_ADDRESS} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CurrencyEth size={16} className="text-[#627EEA] shrink-0" />
                      <span className="text-xs font-medium text-ink">Ethereum (ETH)</span>
                    </div>
                    <CopyAddress address={ETH_ADDRESS} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <TronIcon size={16} />
                      <span className="text-xs font-medium text-ink">TRON (TRX)</span>
                    </div>
                    <CopyAddress address={TRON_ADDRESS} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <BaseIcon size={16} />
                      <span className="text-xs font-medium text-ink">BASE</span>
                    </div>
                    <CopyAddress address={BASE_ADDRESS} />
                  </div>
                </div>
              </TabsContent>

              {/* Buy Me a Coffee */}
              <TabsContent value="bmc" className="h-full flex flex-col items-center justify-center px-8 py-8">
                <div className="flex flex-col items-center w-full">
                  <div className="w-40 h-40 rounded-xl overflow-hidden border border-border-soft bg-paper flex items-center justify-center shrink-0">
                    <img
                      src="/images/general/qr/buymeacoffee-qr-code.png"
                      alt="Buy Me a Coffee QR"
                      className="w-full h-full object-cover block"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        e.currentTarget.nextElementSibling?.removeAttribute("style")
                      }}
                    />
                    <span className="font-mono text-[10px] text-ink-muted text-center px-3" style={{ display: "none" }}>
                      QR-код<br />Buy Me<br />a Coffee
                    </span>
                  </div>
                  <div className="text-center space-y-1 max-w-[260px] mt-4">
                    <p className="text-sm font-medium text-ink">Buy Me a Coffee</p>
                    <p className="text-xs text-ink-muted">
                      Удобный способ поддержать проект картой или через PayPal.<br />Минимальная сумма — 1$.
                    </p>
                  </div>
                  <a
                    href={BUYMEACOFFEE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => posthog.capture("donate_platform_clicked", { platform: "buymeacoffee" })}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 mt-3"
                    style={{ background: "#FF813F" }}
                  >
                    <Coffee size={16} weight="bold" />
                    Поддержать
                  </a>
                </div>
              </TabsContent>

              {/* Ko-fi */}
              <TabsContent value="kofi" className="h-full flex flex-col items-center justify-center px-8 py-8">
                <div className="flex flex-col items-center w-full">
                  <div className="w-40 h-40 rounded-xl overflow-hidden border border-border-soft bg-paper flex items-center justify-center shrink-0">
                    <img
                      src="/images/general/qr/kofi-qr-code.png"
                      alt="Ko-fi QR"
                      className="w-full h-full object-cover block"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        e.currentTarget.nextElementSibling?.removeAttribute("style")
                      }}
                    />
                    <span className="font-mono text-[10px] text-ink-muted text-center px-3" style={{ display: "none" }}>
                      QR-код<br />Ko-fi
                    </span>
                  </div>
                  <div className="text-center space-y-1 max-w-[260px] mt-4">
                    <p className="text-sm font-medium text-ink">Ko-fi</p>
                    <p className="text-xs text-ink-muted">
                      Поддержи проект картой или через PayPal.<br />Без комиссий со стороны Ko-fi.
                    </p>
                  </div>
                  <a
                    href={KOFI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => posthog.capture("donate_platform_clicked", { platform: "kofi" })}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 mt-3"
                    style={{ background: "#29ABE0" }}
                  >
                    <KofiIcon size={16} color="white" />
                    Поддержать
                  </a>
                </div>
              </TabsContent>

              {/* Boosty */}
              <TabsContent value="boosty" className="h-full flex flex-col items-center justify-center px-8 py-8">
                <div className="flex flex-col items-center w-full">
                  <div className="w-40 h-40 rounded-xl overflow-hidden border border-border-soft bg-paper flex items-center justify-center shrink-0">
                    <img
                      src="/images/general/qr/boosty-qr-code.png"
                      alt="Boosty QR"
                      className="w-full h-full object-cover block"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        e.currentTarget.nextElementSibling?.removeAttribute("style")
                      }}
                    />
                    <span className="font-mono text-[10px] text-ink-muted text-center px-3" style={{ display: "none" }}>
                      QR-код Boosty
                    </span>
                  </div>
                  <div className="text-center space-y-1 max-w-[260px] mt-4">
                    <p className="text-sm font-medium text-ink">Boosty</p>
                    <p className="text-xs text-ink-muted">
                      Удобный способ поддерживать проект на постоянной основе</p>
                  </div>
                  <a
                    href={BOOSTY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => posthog.capture("donate_platform_clicked", { platform: "boosty" })}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 mt-3"
                    style={{ background: "#FF813F" }}
                  >
                    <Coffee size={16} weight="bold" />
                    Поддержать
                  </a>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
