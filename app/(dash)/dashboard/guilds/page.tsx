import { getGuilds } from "@/app/actions/Guild"

import Loader from "@/app/components/Loader"
import Guildcard from "@/app/components/Guilds/Guildcard"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWarning } from "@fortawesome/free-solid-svg-icons"
import Searchguild from "@/app/components/Guilds/Searchguild"
import { Guild } from "@/app/types"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "NoRage | Guilds",
	description: "View all guilds linked to the bot and manage their data.",
}

const page = async ({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams?: { [key: string]: string | string[] | undefined }
}) => {
	const {
		success,
		message,
		guilds,
	}: {
		success: boolean
		message: string
		guilds: any
	} = await getGuilds()

	// If the request was not successful, return an error message
	if (!success) {
		return (
			<div className="p-4 bg-red-500 text-white">
				{message}
				<br />
				<br />
				Please try again later.
			</div>
		)
	}

	if (!guilds.map) {
		return <div className="p-4 bg-red-500 text-white">{guilds.error}</div>
	}

	const renderedGuilds = guilds

	// If there is a search query, filter the users array
	if (searchParams?.search) {
		const searchQuery = searchParams.search.toString().toLowerCase()

		// Filter the
		const filteredGuilds = guilds.filter((guild: Guild) => {
			return (
				guild?.guild_name?.toLowerCase()?.includes(searchQuery) ||
				guild?.guild_id?.toLowerCase()?.includes(searchQuery)
			)
		})

		// Update the users array with the filtered users
		renderedGuilds.splice(0, guilds?.length, ...filteredGuilds)
	}
	// Return the page
	return (
		<>
			{renderedGuilds === null ? (
				<Loader />
			) : renderedGuilds.length === 0 ? (
				<>
					<Searchguild />

					<div className="mt-8 w-full h-full flex flex-col justify-center items-center text-white">
						<FontAwesomeIcon
							icon={faWarning}
							className="text-5xl md:text-9xl text-yellow-500"
						/>
						<h1 className="text-3xl md:text-5xl font-semibold mt-5">
							No Guilds Found
						</h1>
					</div>
				</>
			) : (
				<>
					<Searchguild />

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{renderedGuilds.map((guild: Guild, i: number) => {
							return <Guildcard key={i} guild={guild} />
						})}
					</div>
				</>
			)}
		</>
	)
}

export default page
export const dynamic = "force-dynamic"
