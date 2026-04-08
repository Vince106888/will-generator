import axios from "axios";

export type ApiErrorCategory =
  | "unreachable"
  | "auth"
  | "not_found"
  | "validation"
  | "database"
  | "server"
  | "unknown";

export type ApiErrorInfo = {
  message: string;
  category: ApiErrorCategory;
  status?: number;
  detail?: string;
  url?: string;
};

function stringifyDetails(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return undefined;
  }
}

function extractDetail(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return stringifyDetails(data);
  const record = data as Record<string, unknown>;
  return (
    stringifyDetails(record.details) ||
    stringifyDetails(record.error) ||
    stringifyDetails(record.message)
  );
}

function detectDatabaseIssue(detail?: string) {
  if (!detail) return false;
  return /DATABASE_URL|Prisma|migration|schema|P100/i.test(detail);
}

export function describeApiError(error: unknown, action = "Request"): ApiErrorInfo {
  if (!axios.isAxiosError(error)) {
    return {
      category: "unknown",
      message: `${action} failed due to an unexpected error.`,
      detail: error instanceof Error ? error.message : undefined
    };
  }

  const status = error.response?.status;
  const detail = extractDetail(error.response?.data) || error.message;
  const baseURL = error.config?.baseURL;
  const url = baseURL ? new URL(error.config?.url ?? "", baseURL).toString() : error.config?.url;

  if (!status) {
    return {
      category: "unreachable",
      message: `${action} failed because the API could not be reached${url ? ` (${url})` : ""}. Start the API server and retry.`,
      detail,
      url
    };
  }

  if (status === 401 || status === 403) {
    return {
      category: "auth",
      status,
      message: `${action} failed because the session token is invalid or missing. Restart drafting to get a new session.`,
      detail,
      url
    };
  }

  if (status === 404) {
    return {
      category: "not_found",
      status,
      message: `${action} failed because the draft session could not be found. Restart drafting to create a new session.`,
      detail,
      url
    };
  }

  if (status === 400 || status === 422) {
    return {
      category: "validation",
      status,
      message: `${action} failed due to validation issues. ${detail ?? "Check the highlighted fields and retry."}`,
      detail,
      url
    };
  }

  if (status >= 500) {
    const isDb = detectDatabaseIssue(detail);
    return {
      category: isDb ? "database" : "server",
      status,
      message: isDb
        ? `${action} failed because the server reported a database or migration error. ${detail ?? ""}`.trim()
        : `${action} failed due to a server error. ${detail ?? ""}`.trim(),
      detail,
      url
    };
  }

  return {
    category: "unknown",
    status,
    message: `${action} failed with status ${status}. ${detail ?? ""}`.trim(),
    detail,
    url
  };
}

