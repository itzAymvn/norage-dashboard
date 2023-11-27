// Components
import Achievements from "@/app/components/Users/User/Achievements"
import Toggles from "@/app/components/Users/User/Toggles"
import Userdata from "@/app/components/Users/User/Userdata"

// Actions
import { getUser } from "@/app/actions/User"

// Next / Types
import type { Metadata, ResolvingMetadata } from "next"

// Libs
import { Toaster } from "react-hot-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWarning } from "@fortawesome/free-solid-svg-icons"

type Props = {
	params: { id: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = params

	const { success, message, user } = await getUser(id)

	if (!success) {
		return {
			title: "NoRage | Error",
			description: message,
		}
	}

	return {
		title: `NoRage | ${user?.discord?.username}`,
		description: `View ${user?.discord?.username}'s data and manage their settings.`,
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params

	const { success, message, user } = await getUser(id)

	if (!success) {
		return (
			<div className="min-h-full flex flex-col justify-center items-center text-white">
				<FontAwesomeIcon
					icon={faWarning}
					className="text-9xl text-yellow-500"
				/>
				<h1 className="text-4xl font-semibold mt-5">Error</h1>
				<p className="text-xl mt-2">{message}</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-y-5">
			<Userdata user={user!} />
			<Toggles user={user!} />
			<Achievements user={user!} />
			<Toaster />
		</div>
	)
}

export const dynamic = "force-dynamic"
