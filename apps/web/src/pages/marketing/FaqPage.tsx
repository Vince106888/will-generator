// Frame: FAQ Page (puMDs)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { FooterBase } from "../../components/layout/FooterBase";

const faqs = [
  {
    q: "What is a will?",
    a: "A will is a legal document that says who should receive your assets and who should carry out your wishes after you pass away. It reduces confusion and delays."
  },
  {
    q: "Who needs a will?",
    a: "Anyone who owns property or has dependants in Kenya. A will helps reduce delays and disputes for your family."
  },
  {
    q: "What makes a will valid in Kenya?",
    a: "You must be an adult of sound mind, sign the will, and have two independent witnesses sign in your presence. A beneficiary cannot be a witness."
  },
  {
    q: "What is an executor?",
    a: "An executor is responsible for carrying out your instructions, paying debts, and distributing assets. They have a legal duty to act in the best interests of beneficiaries."
  },
  {
    q: "What is a beneficiary?",
    a: "A beneficiary is anyone you want to receive something from your estate — for example a spouse, child, relative, or friend."
  },
  {
    q: "What is a dependent?",
    a: "A dependant is someone who relies on you financially, such as a child or elderly parent. This can affect how you provide for them."
  },
  {
    q: "What is a codicil?",
    a: "A codicil is a formal amendment to an existing will. It changes specific clauses without rewriting the entire document."
  },
  {
    q: "Can I include assets outside Kenya?",
    a: "Yes, but those assets may also be subject to the laws of that country. We recommend seeking local advice for those jurisdictions."
  },
  {
    q: "Can I change my will later?",
    a: "Yes. You can draft a new will that replaces the old one, or create a codicil for smaller updates."
  },
  {
    q: "Can a beneficiary be a witness?",
    a: "No. If a beneficiary signs as a witness, their entitlement may be affected or lost. Always choose independent witnesses."
  },
  {
    q: "Does AI replace legal advice?",
    a: "No. AI helps organize your wishes and explain steps, but legal validity still depends on proper signing and witnesses. For complex estates, request advocate review."
  }
];

export default function FaqPage() {
  return (
    <WorkspaceShell
      nav={{ ctaLabel: "Start drafting", ctaPath: "/entry-choice" }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Frequently asked questions
            </h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Plain-English answers to common questions about wills, Kenyan law,
              and how this service works.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="text-[14px] font-semibold text-ink">{faq.q}</p>
                <p className="mt-2 text-[13px] text-muted">{faq.a}</p>
              </div>
            ))}
          </div>

          <FooterBase />
        </div>
      </Container>
    </WorkspaceShell>
  );
}
