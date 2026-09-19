"use client";

import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, CheckCircle, MapPin, Mail, Phone, Send } from "lucide-react";
import {
  companyInfo,
  inquiryTypes,
  productOptions,
  serviceOptions,
} from "@/data/content";
import {
  submitContactForm,
  type ContactFormData,
  type InquiryType,
} from "@/lib/api/contact";
import type { SiteContent } from "@/lib/site-content";

const initialFormState: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  inquiryType: "Product",
  specificItem: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10";

interface ContactV2Props {
  company?: SiteContent["company"];
  productItems?: string[];
  serviceItems?: string[];
  title?: string;
  description?: string;
  submitLabel?: string;
}

export default function ContactV2({
  company = companyInfo,
  productItems = productOptions,
  serviceItems = serviceOptions,
  title = "Have questions or need assistance?",
  description = "Our team will help you find the right packaging solutions for your business.",
  submitLabel = "Send Inquiry",
}: ContactV2Props) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );

  const specificOptions = useMemo(
    () => [...(formData.inquiryType === "Product" ? productItems : serviceItems), "Other"],
    [formData.inquiryType, productItems, serviceItems],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setToast(null);
    try {
      await submitContactForm(formData);
      setToast({
        type: "success",
        message: "Thank you! Your inquiry has been received. We will be in touch shortly.",
      });
      setFormData(initialFormState);
    } catch {
      setToast({
        type: "error",
        message: "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20">
      <div className="relative overflow-hidden bg-navy">
        <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[12vw] font-black leading-none tracking-tight text-white/[0.04] select-none">
          SUSTAINABLE
        </p>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5ec4a8]">
            Get In Touch
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-slate-300">{description}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-3" noValidate>
          {toast ? (
            <div
              role="alert"
              className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                toast.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              )}
              <p>{toast.message}</p>
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="v2-fullName" className="mb-2 block text-sm font-medium text-navy">
                Full Name *
              </label>
              <input
                id="v2-fullName"
                required
                className={inputClass}
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="v2-email" className="mb-2 block text-sm font-medium text-navy">
                Email *
              </label>
              <input
                id="v2-email"
                type="email"
                required
                className={inputClass}
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="v2-phone" className="mb-2 block text-sm font-medium text-navy">
                Phone Number
              </label>
              <input
                id="v2-phone"
                type="tel"
                className={inputClass}
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="v2-type" className="mb-2 block text-sm font-medium text-navy">
                Inquiry Type
              </label>
              <select
                id="v2-type"
                className={inputClass}
                value={formData.inquiryType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inquiryType: e.target.value as InquiryType,
                    specificItem: "",
                  }))
                }
              >
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="v2-item" className="mb-2 block text-sm font-medium text-navy">
                Specific Product / Service
              </label>
              <select
                id="v2-item"
                className={inputClass}
                value={formData.specificItem}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, specificItem: e.target.value }))
                }
              >
                <option value="">Select an option</option>
                {specificOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="v2-message" className="mb-2 block text-sm font-medium text-navy">
                Message
              </label>
              <textarea
                id="v2-message"
                rows={5}
                className={`${inputClass} resize-y`}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#132a6e] disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Sending..." : submitLabel}
          </button>
        </form>

        <aside className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-navy">Visit Us</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
                <span>{company.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
                <a href={company.phoneHref} className="hover:text-navy">
                  {company.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
                <a href={company.emailHref} className="hover:text-navy">
                  {company.email}
                </a>
              </li>
            </ul>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
            >
              Chat with us on WhatsApp
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <iframe
              title="Revo Trading location"
              src="https://maps.google.com/maps?q=Industrial%20Area%20Doha%20Qatar&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-48 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
