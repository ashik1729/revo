"use client";

import { FormEvent, useMemo, useState } from "react";
import { MapPin, Phone, Mail, CheckCircle, AlertCircle, Send } from "lucide-react";
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
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";

const initialFormState: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  inquiryType: "Product",
  specificItem: "",
  message: "",
};

const contactCards = [
  { icon: MapPin, title: "Address", content: companyInfo.address, href: undefined },
  { icon: Phone, title: "Phone", content: companyInfo.phone, href: companyInfo.phoneHref },
  { icon: Mail, title: "Email", content: companyInfo.email, href: companyInfo.emailHref },
] as const;

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const specificOptions = useMemo(
    () => (formData.inquiryType === "Product" ? productOptions : serviceOptions),
    [formData.inquiryType],
  );

  const handleInquiryTypeChange = (value: InquiryType) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: value,
      specificItem: "",
    }));
  };

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
    <section id="contact" className="section-gradient relative overflow-hidden py-24">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Get In Touch"
          title="Contact Us"
          description="Get in touch for quotes, product inquiries, or service requests"
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-3" variant="left">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-navy/5 sm:p-8"
              noValidate
            >
              {toast && (
                <div
                  role="alert"
                  className={`mb-6 flex animate-scale-in items-start gap-3 rounded-lg border p-4 text-sm ${
                    toast.type === "success"
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {toast.type === "success" ? (
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  )}
                  <p>{toast.message}</p>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-navy">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="+974 7071 8232"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="mb-2 block text-sm font-medium text-navy">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) =>
                      handleInquiryTypeChange(e.target.value as InquiryType)
                    }
                    className={inputClass}
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="specificItem" className="mb-2 block text-sm font-medium text-navy">
                    Specific Product / Service
                  </label>
                  <select
                    id="specificItem"
                    value={formData.specificItem}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, specificItem: e.target.value }))
                    }
                    className={inputClass}
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
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className={`${inputClass} resize-y`}
                    placeholder="Tell us about your requirements..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shine group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
                {!isSubmitting && (
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
                )}
              </button>
            </form>
          </ScrollReveal>

          <div className="flex flex-col gap-5 lg:col-span-2">
            {contactCards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 100} variant="right">
                <article className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg">
                  <IconBox icon={card.icon} size="sm" />
                  <div>
                    <h3 className="font-semibold text-navy">{card.title}</h3>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="mt-1.5 block text-sm text-slate-600 transition-colors duration-300 group-hover:text-accent"
                      >
                        {card.content}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {card.content}
                      </p>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
