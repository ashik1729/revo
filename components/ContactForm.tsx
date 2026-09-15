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
  "w-full border border-forest/15 bg-white px-4 py-3 text-sm text-forest outline-none transition-all duration-300 focus:border-leaf focus:ring-4 focus:ring-leaf/10";

interface ContactFormProps {
  company?: SiteContent["company"];
  productItems?: string[];
  serviceItems?: string[];
  title?: string;
  description?: string;
  submitLabel?: string;
}

export default function ContactForm({
  company = companyInfo,
  productItems = productOptions,
  serviceItems = serviceOptions,
  title = "Have questions or need assistance?",
  description = "Our expert team is here to help you find the right packaging solutions for your business.",
  submitLabel = "Submit Inquiry",
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const specificOptions = useMemo(
    () => [...(formData.inquiryType === "Product" ? productItems : serviceItems), "Other"],
    [formData.inquiryType, productItems, serviceItems],
  );

  const contactCards = [
    { icon: MapPin, title: "Address", content: company.address, href: undefined },
    { icon: Phone, title: "Phone", content: company.phone, href: company.phoneHref },
    { icon: Mail, title: "Email", content: company.email, href: company.emailHref },
  ] as const;

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
    <section id="contact" className="relative overflow-hidden bg-paper py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Get In Touch" title={title} description={description} />

        <div className="grid gap-12 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-3" variant="left">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {toast && (
                <div
                  role="alert"
                  className={`flex items-start gap-3 border p-4 text-sm ${
                    toast.type === "success"
                      ? "border-leaf/30 bg-mist text-forest"
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
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-forest">
                    Full Name <span className="text-leaf">*</span>
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
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-forest">
                    Email <span className="text-leaf">*</span>
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
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-forest">
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
                    placeholder="+971 52 790 6070"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="mb-2 block text-sm font-medium text-forest">
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
                  <label htmlFor="specificItem" className="mb-2 block text-sm font-medium text-forest">
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
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-forest">
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
                    placeholder="Tell us about your packaging requirements..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shine group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? "Sending..." : submitLabel}
                {!isSubmitting && (
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
                )}
              </button>
            </form>
          </ScrollReveal>

          <div className="flex flex-col gap-8 lg:col-span-2">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} delay={index * 100} variant="right">
                  <article className="flex gap-4 border-l-2 border-leaf/50 pl-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-leaf" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-forest">{card.title}</h3>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="mt-1.5 block text-sm text-forest/70 transition-colors duration-300 hover:text-leaf"
                        >
                          {card.content}
                        </a>
                      ) : (
                        <p className="mt-1.5 text-sm leading-relaxed text-forest/70">
                          {card.content}
                        </p>
                      )}
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
