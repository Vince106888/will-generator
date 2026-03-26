import { useEffect, useState } from "react";
import Landing from "./pages/marketing/Landing";
import EntryChoice from "./pages/marketing/EntryChoice";
import ExistingWillGate from "./pages/marketing/ExistingWillGate";
import AiDraftingWorkspace from "./pages/drafting/AiDraftingWorkspace";
import AiExtractionSummary from "./pages/drafting/AiExtractionSummary";
import StructuredFlowShell from "./pages/drafting/StructuredFlowShell";
import AssetsBeneficiariesMapping from "./pages/drafting/AssetsBeneficiariesMapping";
import StructuredExecutors from "./pages/drafting/StructuredExecutors";
import StructuredGuardianship from "./pages/drafting/StructuredGuardianship";
import Review from "./pages/drafting/Review";
import ExportOptions from "./pages/post/ExportOptions";
import SigningGuide from "./pages/post/SigningGuide";
import AdvocateReview from "./pages/post/AdvocateReview";
import ErrorStates from "./pages/post/ErrorStates";
import FaqPage from "./pages/marketing/FaqPage";
import PrivacyTrust from "./pages/marketing/PrivacyTrust";
import { navigate } from "./lib/navigation";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const routes = {
    "/": <Landing />,
    "/entry-choice": <EntryChoice />,
    "/existing-will": <ExistingWillGate />,
    "/drafting/ai-workspace": <AiDraftingWorkspace />,
    "/drafting/ai-summary": <AiExtractionSummary />,
    "/drafting/structured-flow": <StructuredFlowShell />,
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

  const route = routes[path as keyof typeof routes];

  useEffect(() => {
    if (!route) navigate("/");
  }, [route]);

  return route ?? <Landing />;
}
