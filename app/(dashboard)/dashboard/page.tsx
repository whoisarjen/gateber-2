import { redirect } from "next/navigation"

export default async function DashboardPage () {
    redirect('/dashboard/posts')
    return null
}