export type InquiryType = "Product" | "Service";

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  specificItem: string;
  message: string;
}

/**
 * Placeholder contact form submission handler.
 * Replace the mock implementation with a fetch call to the Python API later.
 */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  // TODO: Wire up to Python + PostgreSQL backend
  // Example:
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error('Submission failed');

  console.log("Contact form submission:", data);
  await new Promise((resolve) => setTimeout(resolve, 600));
}
