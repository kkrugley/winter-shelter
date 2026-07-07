// Web3Forms access keys are meant to be used client-side (their free plan
// rejects server-to-server calls with 403), so this posts straight to their
// API from the browser instead of proxying through our own API route.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ""

export async function submitContactForm(fields: {
  subject: string
  message: string
  name?: string
  email?: string
}): Promise<void> {
  if (!WEB3FORMS_KEY) {
    throw new Error("Web3Forms is not configured")
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: fields.subject,
      name: fields.name?.trim() || "Аноним с сайта",
      email: fields.email?.trim() || undefined,
      message: fields.message,
    }),
  })

  const data = await res.json().catch(() => null)
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? "Submission failed")
  }
}
