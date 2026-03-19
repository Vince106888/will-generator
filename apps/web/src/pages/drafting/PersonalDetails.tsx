import { DraftingShell } from "../../components/drafting/DraftingShell";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { StepActions } from "../../components/drafting/StepActions";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Card } from "../../components/ui/Card";
import { useDraftingData } from "../../lib/drafting";

export default function PersonalDetails() {
  const { data, update } = useDraftingData();

  return (
    <DraftingShell
      stepId="personal-details"
      title="Personal details"
      description="This information identifies you clearly in the will and helps your family and executor act without confusion."
      footer={<StepActions currentPath="/drafting/personal-details" />}
      aside={
        <Card size="md" variant="secondary" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Why we ask</p>
          <p className="text-xs text-muted">
            This step helps your family locate assets and carry out your wishes without confusion.
          </p>
        </Card>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldGroup label="Full legal name" hint="This helps identify you clearly in the draft will.">
            <Input
              value={data.legalName}
              onChange={(event) => update({ legalName: event.target.value })}
              placeholder="e.g. Grace Wanjiku Mwangi"
            />
          </FieldGroup>
          <FieldGroup label="ID type" hint="Required by Kenyan succession law for clarity.">
            <Select value={data.idType} onChange={(event) => update({ idType: event.target.value })}>
              <option value="">Select one</option>
              <option value="National ID">National ID</option>
              <option value="Passport">Passport</option>
              <option value="Alien ID">Alien ID</option>
            </Select>
          </FieldGroup>
          <FieldGroup label="ID number">
            <Input
              value={data.idNumber}
              onChange={(event) => update({ idNumber: event.target.value })}
              placeholder="ID / passport number"
            />
          </FieldGroup>
          <FieldGroup label="Date of birth">
            <Input
              type="date"
              value={data.dateOfBirth}
              onChange={(event) => update({ dateOfBirth: event.target.value })}
            />
          </FieldGroup>
          <FieldGroup label="Phone number">
            <Input
              value={data.phone}
              onChange={(event) => update({ phone: event.target.value })}
              placeholder="+254 7xx xxx xxx"
            />
          </FieldGroup>
          <FieldGroup label="Email address" hint="We use this to send your draft when you are ready.">
            <Input
              type="email"
              value={data.email}
              onChange={(event) => update({ email: event.target.value })}
              placeholder="you@email.com"
            />
          </FieldGroup>
        </div>
        <FieldGroup label="Residential address" hint="Your current address helps locate you in legal records.">
          <Input
            value={data.address}
            onChange={(event) => update({ address: event.target.value })}
            placeholder="Street, town, county"
          />
        </FieldGroup>
        <div className="grid gap-4 md:grid-cols-2">
          <FieldGroup label="Marital status" hint="Required by Kenyan succession law for clarity.">
            <Select
              value={data.maritalStatus}
              onChange={(event) => update({ maritalStatus: event.target.value })}
            >
              <option value="">Select one</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
              <option value="divorced">Divorced</option>
            </Select>
          </FieldGroup>
          <FieldGroup label="County / town">
            <Input
              value={data.county}
              onChange={(event) => update({ county: event.target.value })}
              placeholder="Town or county"
            />
          </FieldGroup>
        </div>
      </div>
    </DraftingShell>
  );
}
