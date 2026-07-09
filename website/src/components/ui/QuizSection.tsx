'use client'

import { useState } from 'react'
import Link from 'next/link'
import { STEP1, BRANCHES } from '@/data/quiz'
import type { QuizAction } from '@/data/quiz'
import posthog from 'posthog-js'

type QuizState = 'collapsed' | 'active' | 'result'

const ghostStyle = { borderColor: 'var(--sand-2)', color: 'var(--stone)', background: 'transparent' }
const ghostClass = 'px-4 py-2 rounded-full border text-sm font-medium transition-colors hover:border-[var(--stone)]'

function CtaButton({
  label,
  action,
  primary,
  copiedHref,
  copiedLabel,
  onCopy,
  onCtaClick,
}: {
  label: string
  action: QuizAction
  primary?: boolean
  copiedHref: string | null
  copiedLabel: string
  onCopy: (href: string) => void
  onCtaClick: (label: string, action: QuizAction) => void
}) {
  const isCopied = action.type === 'copy' && copiedHref === action.href

  const cls = primary
    ? 'px-4 py-2 rounded-full bg-[var(--ember)] text-white text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-px'
    : ghostClass
  const style = primary
    ? { boxShadow: 'var(--shadow-btn)' }
    : { borderColor: 'var(--sand-2)', color: 'var(--stone)', background: 'var(--cream)' }

  if (action.type === 'link') {
    return (
      <Link href={action.href} className={cls} style={style} onClick={() => onCtaClick(label, action)}>
        {label}
      </Link>
    )
  }

  if (action.type === 'external') {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        style={style}
        onClick={() => onCtaClick(label, action)}
      >
        {label}
      </a>
    )
  }

  return (
    <button
      onClick={() => {
        onCtaClick(label, action)
        onCopy(action.href)
      }}
      className={cls}
      style={style}
    >
      {isCopied ? copiedLabel : label}
    </button>
  )
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 60
  window.scrollTo({ top, behavior: 'smooth' })
}

const FIRST_BRANCH_KEY = Object.keys(BRANCHES)[0]

export function QuizSection() {
  const [state, setState] = useState<QuizState>('collapsed')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [copiedHref, setCopiedHref] = useState<string | null>(null)

  const isExpanded = state !== 'collapsed'
  const TOTAL_STEPS = 2

  function handleStart() {
    posthog.capture('quiz_started')
    setState('active')
    setStep(0)
    setAnswers([])
    setSelectedPath(null)
    setCopiedHref(null)
  }

  function handleClose() {
    if (state === 'active') {
      posthog.capture('quiz_closed', { step, answer_step1: answers[0] })
    }
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
    posthog.capture('quiz_answer_selected', {
      step,
      answer: path,
      answer_step1: answers[0],
    })
    setTimeout(() => {
      if (step < TOTAL_STEPS - 1) {
        setAnswers(next)
        setStep(step + 1)
        setSelectedPath(null)
      } else {
        setAnswers(next)
        setState('result')
        setSelectedPath(null)
        const branchK = next[0] ?? FIRST_BRANCH_KEY
        const br = BRANCHES[branchK] ?? BRANCHES[FIRST_BRANCH_KEY]
        const resultK = next[1] ?? br.opts[0]?.path
        const res = br.results[resultK] ?? Object.values(br.results)[0]
        posthog.capture('quiz_completed', {
          answer_step1: next[0],
          answer_step2: next[1],
          result_title: res?.title,
        })
      }
    }, 280)
  }

  function handleRestart() {
    posthog.capture('quiz_restarted', { previous_result: result?.title })
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

  function handleCtaClick(label: string, action: QuizAction) {
    posthog.capture('quiz_cta_clicked', {
      result_title: result?.title,
      answer_step1: answers[0],
      answer_step2: answers[1],
      cta_label: label,
      cta_type: action.type,
      cta_href: action.href,
    })
  }

  const dotStatus = Array.from({ length: TOTAL_STEPS }, (_, i) => {
    if (state === 'result') return 'done'
    if (state === 'active' && i === step) return 'active'
    if (state === 'active' && i < step) return 'done'
    return 'idle'
  })

  const branchKey = answers[0] ?? FIRST_BRANCH_KEY
  const branch = BRANCHES[branchKey] ?? BRANCHES[FIRST_BRANCH_KEY]

  const currentQuestion = step === 0 ? STEP1.q : branch.q
  const currentStepOpts = step === 0 ? STEP1.opts : branch.opts

  const resultKey = answers[1] ?? branch.opts[0]?.path
  const result = branch.results[resultKey] ?? Object.values(branch.results)[0]

  return (
    <div
      id="quiz"
      className="mt-5 rounded-[20px] p-7"
      style={{
        scrollMarginTop: '64px',
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
            2 коротких вопроса — подскажем, какое решение ближе именно тебе.
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
                  {state === 'result'
                    ? 'Готово'
                    : `Вопрос ${step + 1} из ${TOTAL_STEPS}`}
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
                  {currentQuestion}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {currentStepOpts.map((opt) => (
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
            {state === 'result' && result && (
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
                    {result.cta.map((cta, i) => (
                      <CtaButton
                        key={cta.label + i}
                        label={cta.label}
                        action={cta.action}
                        primary={i === 0}
                        copiedHref={copiedHref}
                        copiedLabel="Ссылка скопирована ✓"
                        onCopy={handleCopy}
                        onCtaClick={handleCtaClick}
                      />
                    ))}
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
