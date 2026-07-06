'use client'

import { useState } from 'react'
import Link from 'next/link'
import { STEPS, RESULTS } from '@/data/quiz'
import type { QuizAction } from '@/data/quiz'

type QuizState = 'collapsed' | 'active' | 'result'

interface TranslatedOpt  { label: string; path: string }
interface TranslatedStep { q: string; opts: TranslatedOpt[] }
interface TranslatedCta  { label: string }
interface TranslatedResult { title: string; body: string; cta: [TranslatedCta, TranslatedCta] }

const ghostStyle = { borderColor: 'var(--sand-2)', color: 'var(--stone)', background: 'transparent' }
const ghostClass = 'px-4 py-2 rounded-full border text-sm font-medium transition-colors hover:border-[var(--stone)]'

function CtaButton({
  label,
  action,
  primary,
  copiedHref,
  copiedLabel,
  onCopy,
}: {
  label: string
  action: QuizAction
  primary?: boolean
  copiedHref: string | null
  copiedLabel: string
  onCopy: (href: string) => void
}) {
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

  return (
    <button onClick={() => onCopy(action.href)} className={cls} style={style}>
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

const QUIZ_STEPS: TranslatedStep[] = [
  {
    q: 'Что у тебя есть?',
    opts: [
      { label: 'Руки и инструмент', path: 'hands' },
      { label: 'Немного времени', path: 'time' },
      { label: 'Готов поддержать финансово', path: 'money' },
      { label: 'Голос в соцсетях', path: 'voice' },
    ],
  },
  {
    q: 'Сколько животных рядом с тобой?',
    opts: [
      { label: '1–2 кошки', path: 'cozy' },
      { label: '4–5 кошек', path: 'family' },
      { label: 'Целая колония', path: 'purrtap' },
      { label: 'Не знаю точно', path: 'unknown' },
    ],
  },
  {
    q: 'Когда хочешь начать?',
    opts: [
      { label: 'Уже на этих выходных', path: 'now' },
      { label: 'В течение 1–2 недель', path: 'soon' },
      { label: 'Пока просто смотрю', path: 'later' },
    ],
  },
]

const QUIZ_RESULTS: Record<string, TranslatedResult> = {
  hands_cozy:    { title: 'Cozy Shelter · фанера 6 мм', body: 'Для 1–2 кошек. Сборка за вечер. DXF + PDF с разметкой.', cta: [{ label: 'Скачать чертёж' }, { label: 'Найти ЧПУ рядом' }] },
  hands_family:  { title: 'Family Shelter · фанера 6 мм', body: 'Для небольшой стаи. Двухсекционный домик с общей крышей.', cta: [{ label: 'Скачать чертёж' }, { label: 'Найти ЧПУ рядом' }] },
  hands_purrtap: { title: 'PurrTap · поилка для двора', body: 'Минимум инструмента, максимум помощи. Ставится за час.', cta: [{ label: 'Открыть инструкцию' }, { label: 'Заказать набор' }] },
  hands_unknown: { title: 'Cozy Shelter · универсальный', body: 'Самый простой вход. Подойдёт под большинство дворов.', cta: [{ label: 'Скачать чертёж' }, { label: 'Как выбрать место' }] },
  time_cozy:     { title: 'Собери на хакспейсе', body: 'Принеси фанеру — ЧПУ сделает детали за час. Соберёшь сам.', cta: [{ label: 'Найти хакспейс' }, { label: 'Открыть Cozy' }] },
  time_family:   { title: 'Family Shelter на хакспейсе', body: 'Попроси ЧПУ, дальше — лобзик и шуруповёрт.', cta: [{ label: 'Найти хакспейс' }, { label: 'Открыть Family' }] },
  time_purrtap:  { title: 'PurrTap за одну прогулку', body: 'Принести воду, поставить — 30 минут времени.', cta: [{ label: 'Инструкция' }, { label: 'Найти двор' }] },
  time_unknown:  { title: 'Помочь волонтёру', body: 'Подключись к сборке чужого домика — команды ищут руки.', cta: [{ label: 'Найти сборку' }, { label: 'Истории' }] },
  money_cozy:    { title: 'Оплати один Cozy Shelter', body: 'Фанера + крепёж = ~35 €. Волонтёр соберёт и установит.', cta: [{ label: 'Поддержать' }, { label: 'Истории' }] },
  money_family:  { title: 'Оплати Family Shelter', body: 'Материалы ~70 €. Накормим стаю зимой.', cta: [{ label: 'Поддержать' }, { label: 'Истории' }] },
  money_purrtap: { title: 'Набор PurrTap', body: 'Поилка + расходники ~20 €. Ставь с волонтёрами.', cta: [{ label: 'Поддержать' }, { label: 'Истории' }] },
  money_unknown: { title: 'Открытый донат', body: 'Направим туда, где острее: материалы или логистика.', cta: [{ label: 'Поддержать' }, { label: 'Отчёт расходов' }] },
  voice_cozy:    { title: 'Поделиться Cozy', body: 'Готовый пост с чертежом. 1 клик — сосед узнает.', cta: [{ label: 'Скопировать ссылку' }, { label: 'Открыть страницу' }] },
  voice_family:  { title: 'Рассказать про Family', body: 'Ссылка + история «5 кошек пережили зиму».', cta: [{ label: 'Скопировать ссылку' }, { label: 'Прочитать историю' }] },
  voice_purrtap: { title: 'PurrTap — самое простое', body: 'Ролик «как поставить за 30 минут».', cta: [{ label: 'Открыть страницу' }, { label: 'Скопировать ссылку' }] },
  voice_unknown: { title: 'Рассказать о SafePaws', body: 'Общее описание + 3 истории. Расшарь одному человеку.', cta: [{ label: 'Открыть сайт' }, { label: 'Скопировать ссылку' }] },
}

export function QuizSection() {
  const tSteps = QUIZ_STEPS
  const tResults = QUIZ_RESULTS

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
  const resultActions =
    RESULTS[resultKey] ??
    RESULTS[(answers[0] ?? 'hands') + '_unknown'] ??
    RESULTS['hands_unknown']
  const resultText =
    tResults[resultKey] ??
    tResults[(answers[0] ?? 'hands') + '_unknown'] ??
    tResults['hands_unknown']

  const currentStepOpts = tSteps[step]?.opts ?? STEPS[step].opts

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
                  {state === 'result'
                    ? 'Готово'
                    : `Вопрос ${step + 1} из ${STEPS.length}`}
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
                  {tSteps[step]?.q ?? STEPS[step].q}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {currentStepOpts.map((opt, i) => {
                    const path = STEPS[step].opts[i]?.path ?? opt.path
                    return (
                      <button
                        key={path}
                        onClick={() => handleAnswer(path)}
                        disabled={selectedPath !== null}
                        className={`quiz-answer-btn${selectedPath === path ? ' selected' : ''}`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Result */}
            {state === 'result' && resultText && (
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
                    {resultText.title}
                  </div>
                  <p className="text-sm mt-1.5" style={{ color: 'var(--stone)' }}>
                    {resultText.body}
                  </p>
                  <div className="flex gap-2.5 mt-3.5 flex-wrap">
                    <CtaButton
                      label={resultText.cta[0].label}
                      action={resultActions.cta[0].action}
                      primary
                      copiedHref={copiedHref}
                      copiedLabel="Ссылка скопирована ✓"
                      onCopy={handleCopy}
                    />
                    <CtaButton
                      label={resultText.cta[1].label}
                      action={resultActions.cta[1].action}
                      copiedHref={copiedHref}
                      copiedLabel="Ссылка скопирована ✓"
                      onCopy={handleCopy}
                    />
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
