import { SettingsForm } from "@/components/admin/settings-form";
import { getCompany } from "@/lib/repository";
export default async function SettingsPage(){return <SettingsForm company={await getCompany()}/>}
