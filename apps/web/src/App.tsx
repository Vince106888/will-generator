import { useEffect, useState } from "react";
import Landing from "./pages/marketing/Landing";
import EntryChoice from "./pages/marketing/EntryChoice";
import ExistingWillGate from "./pages/marketing/ExistingWillGate";
import AiDraftingWorkspace from "./pages/drafting/AiDraftingWorkspace";
import AiPersonalDetails from "./pages/drafting/AiPersonalDetails";
import AiProcessing from "./pages/drafting/AiProcessing";
import AiExtractionSummary from "./pages/drafting/AiExtractionSummary";
import AiCorrections from "./pages/drafting/AiCorrections";
import StructuredFlowShell from "./pages/drafting/StructuredFlowShell";
import StructuredPersonalDetails from "./pages/drafting/StructuredPersonalDetails";
import AssetsBeneficiariesMapping from "./pages/drafting/AssetsBeneficiariesMapping";
import StructuredExecutors from "./pages/drafting/StructuredExecutors";
import StructuredGuardianship from "./pages/drafting/StructuredGuardianship";
import StructuredSpecialWishes from "./pages/drafting/StructuredSpecialWishes";
import Review from "./pages/drafting/Review";
import ExportOptions from "./pages/post/ExportOptions";
import SigningGuide from "./pages/post/SigningGuide";
import AdvocateReview from "./pages/post/AdvocateReview";
import ErrorStates from "./pages/post/ErrorStates";
import FaqPage from "./pages/marketing/FaqPage";
import PrivacyTrust from "./pages/marketing/PrivacyTrust";
import { navigate } from "./lib/navigation";
import { getDraftingGuardRedirect } from "./lib/draftingGuard";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const routes = {
    "/": <Landing />,
    "/entry-choice": <EntryChoice />,
    "/existing-will": <ExistingWillGate />,
    "/drafting/ai/personal-details": <AiPersonalDetails />,
    "/drafting/ai/input": <AiDraftingWorkspace />,
    "/drafting/ai/processing": <AiProcessing />,
    "/drafting/ai/summary": <AiExtractionSummary />,
    "/drafting/ai/corrections": <AiCorrections />,
    "/drafting/ai/review": <Review />,
    "/drafting/ai-workspace": <AiDraftingWorkspace />,
    "/drafting/ai-summary": <AiExtractionSummary />,
    "/drafting/structured-flow": <StructuredFlowShell />,
    "/drafting/structured/personal-details": <StructuredPersonalDetails />,
    "/drafting/structured/executors": <StructuredExecutors />,
    "/drafting/structured/guardians": <StructuredGuardianship />,
    "/drafting/structured/assets": <AssetsBeneficiariesMapping />,
    "/drafting/structured/wishes": <StructuredSpecialWishes />,
    "/drafting/mapping": <AssetsBeneficiariesMapping />,
    "/drafting/structured-executors": <StructuredExecutors />,
    "/drafting/guardianship": <StructuredGuardianship />,
    "/drafting/review-result": <Review />,
    "/drafting/export-options": <ExportOptions />,
    "/drafting/signing-guide": <SigningGuide />,
    "/drafting/advocate-review": <AdvocateReview />,
    "/drafting/error": <ErrorStates />,
    "/faq": <FaqPage />,
    "/privacy": <PrivacyTrust />
  } as const;

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const guardRedirect = getDraftingGuardRedirect(
    `${window.location.pathname}${window.location.search}`
  );
  const resolvedPath = guardRedirect ?? path;
  const route = routes[resolvedPath as keyof typeof routes];

  useEffect(() => {
    if (guardRedirect) {
      navigate(guardRedirect);
      return;
    }
    if (!route) navigate("/");
  }, [guardRedirect, route]);

  return route ?? <Landing />;
}
