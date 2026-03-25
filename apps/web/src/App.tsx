import { useEffect, useState } from "react";
import Landing from "./pages/marketing/Landing";
import PreStart from "./pages/marketing/PreStart";
import Eligibility from "./pages/marketing/Eligibility";
import EntryChoice from "./pages/marketing/EntryChoice";
import ExistingWillGate from "./pages/marketing/ExistingWillGate";
import PersonalDetails from "./pages/drafting/PersonalDetails";
import DraftingHome from "./pages/drafting/DraftingHome";
import AiDraftingWorkspace from "./pages/drafting/AiDraftingWorkspace";
import AiExtractionSummary from "./pages/drafting/AiExtractionSummary";
import FamilyDependants from "./pages/drafting/FamilyDependants";
import Executors from "./pages/drafting/Executors";
import Beneficiaries from "./pages/drafting/Beneficiaries";
import Assets from "./pages/drafting/Assets";
import Distribution from "./pages/drafting/Distribution";
import Guardians from "./pages/drafting/Guardians";
import SpecialWishes from "./pages/drafting/SpecialWishes";
import Review from "./pages/drafting/Review";
import MobileDrafting from "./pages/drafting/MobileDrafting";
import Result from "./pages/Result";
import SigningGuide from "./pages/post/SigningGuide";
import SaveContinue from "./pages/post/SaveContinue";
import ErrorStates from "./pages/post/ErrorStates";
import StructuredFlowShell from "./pages/drafting/StructuredFlowShell";
import AssetsBeneficiariesMapping from "./pages/drafting/AssetsBeneficiariesMapping";
import StructuredExecutors from "./pages/drafting/StructuredExecutors";
import StructuredGuardianship from "./pages/drafting/StructuredGuardianship";
import ExportOptions from "./pages/post/ExportOptions";
import AdvocateReview from "./pages/post/AdvocateReview";
import FaqPage from "./pages/marketing/FaqPage";
import PrivacyTrust from "./pages/marketing/PrivacyTrust";
import { navigate } from "./lib/navigation";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const routes = {
    "/": <Landing />,
    "/pre-start": <PreStart />,
    "/eligibility": <Eligibility />,
    "/entry-choice": <EntryChoice />,
    "/existing-will": <ExistingWillGate />,
    "/drafting": <DraftingHome />,
    "/drafting/ai-workspace": <AiDraftingWorkspace />,
    "/drafting/ai-summary": <AiExtractionSummary />,
    "/drafting/personal-details": <PersonalDetails />,
    "/drafting/family": <FamilyDependants />,
    "/drafting/executors": <Executors />,
    "/drafting/beneficiaries": <Beneficiaries />,
    "/drafting/assets": <Assets />,
    "/drafting/distribution": <Distribution />,
    "/drafting/guardians": <Guardians />,
    "/drafting/special-wishes": <SpecialWishes />,
    "/drafting/review": <Review />,
    "/drafting/mobile": <MobileDrafting />,
    "/drafting/generated": <Result />,
    "/drafting/signing-guide": <SigningGuide />,
    "/drafting/save": <SaveContinue />,
    "/drafting/error": <ErrorStates />,
    "/drafting/structured-flow": <StructuredFlowShell />,
    "/drafting/mapping": <AssetsBeneficiariesMapping />,
    "/drafting/structured-executors": <StructuredExecutors />,
    "/drafting/guardianship": <StructuredGuardianship />,
    "/drafting/review-result": <Result />,
    "/drafting/export-options": <ExportOptions />,
    "/drafting/advocate-review": <AdvocateReview />,
    "/faq": <FaqPage />,
    "/privacy": <PrivacyTrust />,
    "/wills/start": <PersonalDetails />,
    "/wills/result": <Result />
  } as const;

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const route = routes[path as keyof typeof routes];

  useEffect(() => {
    if (!route) navigate("/");
  }, [route]);

  return route ?? <Landing />;
}
