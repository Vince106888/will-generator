import { useState } from "react";
import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { navigate } from "../../lib/navigation";

export default function Eligibility() {
  const [isAdult, setIsAdult] = useState<null | boolean>(null);
  const [isKenyan, setIsKenyan] = useState<null | boolean>(null);
  const [soundMind, setSoundMind] = useState<null | boolean>(null);

  const eligible = isAdult && isKenyan && soundMind;
  const hasAnswered = isAdult !== null && isKenyan !== null && soundMind !== null;

  const questions = [
    {
      label: "1. Are you 18 years or older?",
      value: isAdult,
      setValue: setIsAdult
    },
    {
      label: "2. Are you making this will voluntarily and of sound mind?",
      value: soundMind,
      setValue: setSoundMind
    },
    {
      label: "3. Is Kenya your main legal jurisdiction?",
      value: isKenyan,
      setValue: setIsKenyan
    }
  ];

  return (
    <MarketingShell>
      <Container className="pb-24 pt-12">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Eligibility check (Legacy)</p>
          <p className="text-[15px] text-muted">
            Legacy page retained for archive reference. Use Entry Choice and Existing Will Gate for the active flow.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {questions.map((item) => (
              <Card key={item.label} size="lg" className="space-y-3">
                <p className="text-sm font-semibold text-ink">{item.label}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => item.setValue(true)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                      item.value === true ? "border-border bg-card text-ink" : "border-border text-muted"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => item.setValue(false)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                      item.value === false ? "border-border bg-secondary text-ink" : "border-border text-muted"
                    }`}
                  >
                    No
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card size="lg" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Why we ask these questions</p>
              <p className="text-xs text-muted">
                Kenyan law requires that a will is made by an adult who understands their decisions. These checks
                protect you and your family.
              </p>
            </Card>

            {!hasAnswered && (
              <Card size="lg" className="space-y-2">
                <p className="text-xs text-muted">Answer each question to continue.</p>
              </Card>
            )}

            {hasAnswered && eligible && (
              <Card size="lg" className="space-y-2">
                <p className="text-xs text-muted">You are eligible to begin drafting.</p>
                <Button variant="primary" size="sm" onClick={() => navigate("/entry-choice")}>
                  Continue to entry choice
                </Button>
              </Card>
            )}

            {hasAnswered && !eligible && (
              <Card size="lg" variant="error" className="space-y-2">
                <p className="text-xs font-semibold text-ink">We may not be the right fit</p>
                <p className="text-xs text-muted">
                  Based on your response, you may need in-person legal guidance. We can connect you to an advocate for
                  advice.
                </p>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/advocate-review")}>
                  Talk to an advocate
                </Button>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
