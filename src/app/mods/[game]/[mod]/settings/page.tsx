import { ModsPageProps } from "../page"

export default async function ModSettingsPage({ params } : ModsPageProps) {

  console.log(await params)

  return (
    <div></div>
  )
}