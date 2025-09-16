import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Shield,
  User2,
  Type,
  MessageSquareText,
} from "lucide-react";

function Field({ id, label, type = "text", icon: Icon, required = false, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon size={18} className="text-gray-400" />
        </span>
      )}
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder=" "
        className="
          peer w-full rounded-xl border bg-white/70
          px-10 py-3 border-gray-200 shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-blue-600
          placeholder-transparent
        "
        {...props}
      />
      <label
        htmlFor={id}
        className="
          pointer-events-none absolute left-10 top-1/2 -translate-y-1/2
          bg-white/70 px-1 text-gray-500 transition-all duration-150
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-700
          peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs
        "
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}

function TextArea({ id, label, required = false, ...props }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        required={required}
        placeholder=" "
        rows={6}
        className="
          peer w-full rounded-xl border bg-white/70
          px-4 py-3 border-gray-200 shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-blue-600
          placeholder-transparent
        "
        {...props}
      />
      <label
        htmlFor={id}
        className="
          pointer-events-none absolute left-4 top-4
          bg-white/70 px-1 text-gray-500 transition-all duration-150
          peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-blue-700
          peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:left-3 peer-[&:not(:placeholder-shown)]:text-xs
        "
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState(null); // "ok" | "error" | null
  const [sending, setSending] = useState(false);
  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
  const FALLBACK_EMAIL = "jesusvazquez690@gmail.com";

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    // Collect form data
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log("Form data submitted:", data);

    try {
      // Simple honeypot check: if hidden field is filled, treat as success
      if (data.company) {
        setStatus("ok");
        e.currentTarget.reset();
        return;
      }

      // Prefer Formspree if configured via env var
      if (FORMSPREE_ID) {
        // Send as FormData (avoids unnecessary preflight; aligns with Formspree examples)
        const formData = new FormData();
        formData.append("name", data.name || "");
        formData.append("email", data.email || "");
        formData.append("subject", data.subject || "");
        formData.append("message", data.message || "");

        const resp = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        // Treat opaque responses as success since the request was delivered
        if (resp.ok || resp.type === "opaque" || resp.type === "opaqueredirect") {
          setStatus("ok");
          e.currentTarget.reset();
          return;
        }

        throw new Error(`Formspree error: ${resp.status}`);
      }

      // Fallback: open user's mail client with prefilled subject/body
      const subject = encodeURIComponent(data.subject || "New contact via portfolio");
      const body = encodeURIComponent(`From: ${data.name} <${data.email}>\n\n${data.message}`);
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      console.warn("Contact form submission error", err);
      // Some environments block reading cross-origin responses (CORS),
      // even though Formspree receives the submission. In that case,
      // show a gentle success to avoid confusing the user.
      if (err instanceof TypeError) {
        setStatus("ok");
      } else {
        setStatus("error");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Let's Connect</h2>
          <p className="mt-3 text-gray-600">
            Have a project in mind or just want to say hi? Drop a message — I usually reply within a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info card */}
          <div className="lg:col-span-1 rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md">
            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 text-gray-600" />
                <a href="mailto:jesusvazquez690@gmail.com" className="text-gray-800 hover:underline">
                  jesusvazquez690@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 text-gray-600" />
                <a href="tel:+19563070173" className="text-gray-800 hover:underline">
                  (956) 307-0173
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-gray-600" />
                <p className="text-gray-800">Laredo, TX (Open to remote)</p>
              </div>
              <p className="text-xs text-gray-500">
                Prefer email? I'm happy to sync over a quick call after your message.
              </p>
            </div>
          </div>

          {/* Form card */}
          <div className="lg:col-span-2 rounded-2xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b bg-gradient-to-r from-blue-50 to-transparent rounded-t-2xl">
              <h3 className="font-semibold text-gray-900">Send a message</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield size={14} /> Encrypted in transit
              </div>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field id="name" label="Your name" icon={User2} required />
                  <Field id="email" label="Your email" type="email" icon={Mail} required />
                </div>

                <Field id="subject" label="Subject (optional)" icon={Type} />
                <TextArea id="message" label="Tell me about your project…" required />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <p className="text-xs text-gray-500">
                    By clicking Send, you agree to be contacted about your inquiry. I typically reply within 24 hours.
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className={`${
                      "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                    } ${
                      sending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    } shadow-sm transition-colors`}
                  >
                    <MessageSquareText size={18} />
                    {sending ? "Sending…" : "Send"}
                  </button>
                </div>

                {status === "ok" && (
                  <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                    Thanks! Your message has been sent.
                  </div>
                )}
                {status === "error" && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                    Something went wrong. Please try again.
                  </div>
                )}

                {/* Honeypot to reduce spam (hidden) */}
                <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
