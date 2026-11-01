import type { Metadata } from "next"
import { VSCodePortfolio } from "@/legacy/vscode/components/vscode-portfolio"

export const metadata: Metadata = {
  title: "VS Code Edition",
  description: "The VS Code themed version of Ebube Udorie's developer portfolio.",
  alternates: { canonical: "/vscode" },
  robots: { index: false, follow: true },
}

export default function VSCodeEditionPage() {
  return <VSCodePortfolio />
}
