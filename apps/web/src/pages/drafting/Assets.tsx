import { DraftingShell } from "../../components/drafting/DraftingShell";
import { StepActions } from "../../components/drafting/StepActions";
import { Card } from "../../components/ui/Card";
import { useDraftingData } from "../../lib/drafting";

export default function Assets() {
  useDraftingData();

  const categories = [
    {
      title: "Land & real property",
      body: "Title deed number, location, ownership notes. Example: Lavington family home.",
      tone: "default"
    },
    {
      title: "Bank, SACCO & M-Pesa",
      body: "Account names, numbers, and institutions. Example: SACCO account, M-Pesa wallet.",
      tone: "secondary"
    },
    {
      title: "Vehicles",
      body: "Registration number, make, model. Example: KDA 123A.",
      tone: "default"
    },
    {
      title: "Business interests",
      body: "Company names, shares, or partnerships.",
      tone: "default"
    },
    {
      title: "Personal property",
      body: "Valuables, household items, or special possessions.",
      tone: "secondary"
    },
    {
      title: "Other assets",
      body: "Any other assets you want to include.",
      tone: "default"
    }
  ];

  return (
    <>
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-[390px] bg-paper">
          <div className="flex h-[62px] items-center justify-center text-sm text-ink">9:41</div>
          <div className="space-y-4 px-5 pb-6">
            <div className="space-y-2">
              <p className="font-display text-2xl text-ink">Assets</p>
              <p className="text-xs text-muted">Add assets in clear categories.</p>
            </div>
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Land & real property</p>
              <p className="text-xs text-muted">Title deed number, location, ownership notes.</p>
            </Card>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Bank, SACCO & M-Pesa</p>
              <p className="text-xs text-muted">Account names, numbers, and institutions.</p>
            </Card>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <DraftingShell
          stepId="assets"
          title="Assets"
          description="Add your assets in clear categories. You can update details later."
          footer={<StepActions currentPath="/drafting/assets" />}
        >
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              {categories.map((item) => (
                <Card
                  key={item.title}
                  size="md"
                  variant={item.tone === "secondary" ? "secondary" : "default"}
                  className="space-y-2"
                >
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-xs text-muted">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </DraftingShell>
      </div>
    </>
  );
}
