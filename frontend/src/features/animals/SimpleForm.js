"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-green";

export default function SimpleForm({ fields, submitLabel, successTitle, successText }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  function validate() {
    const next = {};
    for (const f of fields) {
      const v = (values[f.name] ?? "").toString().trim();
      if (f.required && !v) next[f.name] = `${f.label} is required.`;
      else if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v))
        next[f.name] = "Enter a valid email address.";
    }
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("loading");
    // PROTOTYPE: no backend yet. Simulates a network request.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center" role="status">
        <CheckCircle2 size={36} className="mx-auto text-green" aria-hidden />
        <h2 className="mt-3 font-heading text-xl font-bold text-forest">{successTitle}</h2>
        <p className="mt-2 text-sm text-muted">{successText}</p>
        <p className="mt-4 rounded-lg bg-sage px-3 py-2 text-xs text-forest">
          Prototype: this submission was not sent or stored anywhere.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-line bg-white p-6">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-1.5 block text-sm font-semibold">
            {f.label}
            {f.required && <span className="text-green"> *</span>}
          </label>
          {f.type === "select" ? (
            <select
              id={f.name}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              aria-invalid={!!errors[f.name]}
              className={`${inputClass} ${errors[f.name] ? "border-red-500" : "border-line"}`}
            >
              <option value="">Select…</option>
              {f.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          ) : f.type === "textarea" ? (
            <textarea
              id={f.name}
              rows={4}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              aria-invalid={!!errors[f.name]}
              className={`${inputClass} ${errors[f.name] ? "border-red-500" : "border-line"}`}
            />
          ) : (
            <input
              id={f.name}
              type={f.type ?? "text"}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              aria-invalid={!!errors[f.name]}
              className={`${inputClass} ${errors[f.name] ? "border-red-500" : "border-line"}`}
            />
          )}
          {errors[f.name] && (
            <p className="mt-1 text-xs text-red-600" role="alert">{errors[f.name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3 text-sm font-semibold text-white transition hover:bg-green disabled:opacity-70"
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
      <p className="text-center text-xs text-muted">Prototype form. Nothing is stored yet.</p>
    </form>
  );
}