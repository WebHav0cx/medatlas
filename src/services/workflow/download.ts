import type {
  DocumentRecord,
  LaboratoryResult,
} from "../../domain/workflow/types.ts";
function saveText(name: string, content: string) {
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });
  const href = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = href;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(href);
}
export function downloadRecord(document: DocumentRecord) {
  const date = document.date.includes("-")
    ? new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(`${document.date}T12:00:00`))
    : document.date;
  const content = [
    "MEDATLAS FICTIONAL PATIENT COPY",
    "",
    document.title,
    `Source facility: ${document.sourceFacility}`,
    `Document category: ${document.category}`,
    `Document date: ${date}`,
    `Author or releasing professional: ${document.author ?? "Not recorded"}`,
    "",
    "This local demonstration copy contains synthetic information only.",
  ].join("\n");
  saveText(`${document.title.toLowerCase().replace(/\s+/g, "-")}.txt`, content);
}
export function downloadLabResult(result: LaboratoryResult) {
  saveText(
    `${result.reportTitle.toLowerCase().replace(/\s+/g, "-")}.txt`,
    [
      "Prime Diagnostics",
      result.reportTitle,
      result.status,
      result.requestId,
      ...result.values.map(
        (value) =>
          `${value.test}\t${value.value} ${value.unit}\t${value.reference}\t${value.flag}`,
      ),
      result.comments,
      "Structured result values and reviewer comments above form part of this fictional diagnostic report.",
    ].join("\n"),
  );
}
