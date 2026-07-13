export type InquiryType = "Product" | "Service";

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  specificItem: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }
}
