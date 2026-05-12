'use client'

import { useState } from 'react'
import Link from 'next/link'
import { STEPS, RESULTS, type QuizCta } from '@/data/quiz'

type QuizState = 'collapsed' | 'active' | 'result'

const ghostStyle = { borderColor: 'var(--sand-2)', color: 'var(--stone)', background: 'transparent' }
const ghostClass = 'px-4 py-2 rounded-full border text-sm font-medium transition-colors hover:border-[var(--stone)]'

function CtaButton({
  cta,
  primary,
  copiedHref,
  onCopy,
}: {
  cta: QuizCta
  primary?: boolean
  copiedHref: string | null
  onCopy: (href: string) => void
}) {
  const { label, action } = cta
  const isCopied = action.type === 'copy' && copiedHref === action.href

  const cls = primary
    ? 'px-4 py-2 rounded-full bg-[var(--ember)] text-white text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-px'
    : ghostClass
  const style = primary
    ? { boxShadow: 'var(--shadow-btn)' }
    : { borderColor: 'var(--sand-2)', color: 'var(--stone)', background: 'var(--cream)' }

  if (action.type === 'link') {
    return <Link href={action.href} className={cls} style={style}>{label}</Link>
  }

  if (action.type === 'external') {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
        {label}
      </a>
    )
  }

  // copy
  return (
    <button onClick={() => onCopy(action.href)} className={cls} style={style}>
      {isCopied ? 'Ссылка скопирована ✓' : label}
    </button>
  )
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 60
  window.scrollTo({ top, behavior: 'smooth' })
}

export function QuizSection() {
  const [state, setState] = useState<QuizState>('collapsed')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [copiedHref, setCopiedHref] = useState<string | null>(null)

  const isExpanded = state !== 'collapsed'

  function handleStart() {
    setState('active')
    setStep(0)
    setAnswers([])
    setSelectedPath(null)
    setCopiedHref(null)
  }

  function handleClose() {
    setState('collapsed')
    setTimeout(() => {
      setStep(0)
      setAnswers([])
      setSelectedPath(null)
      setCopiedHref(null)
    }, 460)
  }

  function handleAnswer(path: string) {
    if (selectedPath !== null) return
    setSelectedPath(path)
    const next = [...answers, path]
    setTimeout(() => {
      if (step < STEPS.length - 1) {
        setAnswers(next)
        setStep(step + 1)
        setSelectedPath(null)
      } else {
        setAnswers(next)
        setState('result')
        setSelectedPath(null)
      }
    }, 280)
  }

  function handleRestart() {
    setState('active')
    setStep(0)
    setAnswers([])
    setSelectedPath(null)
    setCopiedHref(null)
  }

  function handleCopy(href: string) {
    const url = window.location.origin + href
    navigator.clipboard.writeText(url).then(() => {
      setCopiedHref(href)
      setTimeout(() => setCopiedHref(null), 2000)
    })
  }

  const dotStatus = [0, 1, 2].map((i) => {
    if (state === 'result') return 'done'
    if (state === 'active' && i === step) return 'active'
    if (state === 'active' && i < step) return 'done'
    return 'idle'
  })

  const resultKey = (answers[0] ?? 'hands') + '_' + (answers[1] ?? 'unknown')
  const result =
    RESULTS[resultKey] ??
    RESULTS[(answers[0] ?? 'hands') + '_unknown'] ??
    RESULTS['hands_unknown']

  return (
    <div
      id="quiz"
      className="mt-5 rounded-[20px] p-7"
      style={{
        background: 'linear-gradient(180deg, var(--ember-pale) 0%, var(--cream) 80%)',
        border: '1.5px dashed var(--ember-soft)',
      }}
    >
      {/* HEAD: always visible */}
      <div className="flex items-center gap-7 flex-wrap justify-between">
        <div className="flex-1 min-w-[280px]">
          <h3 className="heading-card" style={{ fontSize: 28, marginTop: 4 }}>
            Не уверен, какой путь твой?
          </h3>
          <p className="text-sm mt-1.5" style={{ color: 'var(--stone)' }}>
            3 коротких вопроса — подскажем, какое решение ближе именно тебе.
          </p>
        </div>
        <div className="flex gap-2.5 items-center">
          <button
            onClick={handleStart}
            aria-hidden={isExpanded}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ember)] text-white text-sm font-medium quiz-start-btn"
            style={{ boxShadow: 'var(--shadow-btn)' }}
          >
            Подобрать за 30 сек
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollToId('catalog')}
            className={ghostClass}
            style={ghostStyle}
          >
            позже
          </button>
        </div>
      </div>

      {/* EXPANDABLE BODY */}
      <div
        className="quiz-body-wrap"
        style={{
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="quiz-body-wrap-inner">
          <div
            className="mt-5 rounded-[14px] border p-[22px]"
            style={{ background: 'var(--card-bg)', borderColor: 'var(--sand-2)' }}
          >
            {/* Progress + close */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {dotStatus.map((ds, i) => (
                  <span
                    key={i}
                    className="inline-block w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        ds === 'active' ? 'var(--ember)'
                        : ds === 'done'  ? 'var(--forest)'
                        : 'var(--sand-2)',
                      boxShadow: ds === 'active' ? '0 0 0 3px var(--ember-pale)' : undefined,
                    }}
                  />
                ))}
                <span
                  className="ml-2.5 text-[11px] uppercase tracking-[0.1em] font-medium"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--stone)' }}
                >
                  {state === 'result' ? 'Готово' : `Вопрос ${step + 1} из ${STEPS.length}`}
                </span>
              </div>
              <button onClick={handleClose} className={ghostClass} style={ghostStyle}>
                ← закрыть
              </button>
            </div>

            {/* Question */}
            {state === 'active' && (
              <div key={step} className="quiz-slide-in">
                <div
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: 26,
                    color: 'var(--charcoal)',
                    letterSpacing: '-0.015em',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {STEPS[step].q}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {STEPS[step].opts.map((opt) => (
                    <button
                      key={opt.path}
                      onClick={() => handleAnswer(opt.path)}
                      disabled={selectedPath !== null}
                      className={`quiz-answer-btn${selectedPath === opt.path ? ' selected' : ''}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Result */}
            {state === 'result' && (
              <div key="result" className="quiz-result-in flex gap-6 items-center p-1 flex-wrap sm:flex-nowrap">
                <div
                  className="w-16 h-16 rounded-[14px] flex items-center justify-center shrink-0"
                  style={{ background: 'var(--ember-pale)', color: 'var(--ember)' }}
                >
                  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M24 40s-14-8-14-20a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 12-14 20-14 20z" />
                    <path d="M20 26a4 4 0 0 1 8 0" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mb-2.5"
                    style={{ background: 'var(--ember-pale)', color: 'var(--ember-accessible)' }}
                  >
                    твой путь
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-hand)',
                      fontSize: 24,
                      color: 'var(--charcoal)',
                      letterSpacing: '-0.015em',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {result.title}
                  </div>
                  <p className="text-sm mt-1.5" style={{ color: 'var(--stone)' }}>
                    {result.body}
                  </p>
                  <div className="flex gap-2.5 mt-3.5 flex-wrap">
                    <CtaButton cta={result.cta[0]} primary copiedHref={copiedHref} onCopy={handleCopy} />
                    <CtaButton cta={result.cta[1]}         copiedHref={copiedHref} onCopy={handleCopy} />
                    <button onClick={handleRestart} className={ghostClass} style={ghostStyle}>
                      Пройти ещё раз
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
