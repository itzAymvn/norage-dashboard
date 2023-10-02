import Link from "next/link";
import Image from "next/image";
import { Guild } from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@/app/providers/Tooltip";

const Guildcard = ({ guild }: { guild: Guild }) => {
    return (
        <div
            className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900
    p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform break-words relative"
        >
            <div className="flex flex-col items-center">
                <div className="flex-shrink-0">
                    <Image
                        src={`${
                            guild.guild_icon === null
                                ? "/discord.png"
                                : guild.guild_icon
                        }`}
                        alt={guild.guild_name}
                        width={128}
                        height={128}
                        className={"rounded-full"}
                    />
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-center text-white">
                        {guild.guild_name === null ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    title="This guild could not be fetched."
                                />
                                <span className="ml-1">Unknown</span>
                            </>
                        ) : (
                            guild.guild_name
                        )}
                    </h3>

                    <p className="text-sm text-center text-gray-400">
                        {guild.guild_id}
                    </p>

                    {/* Display createdAt */}
                    <p className="text-sm text-center text-gray-400">
                        Joined At: {new Date(guild.createdAt).toLocaleString()}
                    </p>

                    {/* Display updatedAt */}
                    <p className="text-sm text-center text-gray-400">
                        Updated At: {new Date(guild.updatedAt).toLocaleString()}
                    </p>

                    <div className="mt-2">
                        <Link
                            href={`/dashboard/guilds/${guild._id}`}
                            className="flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700
                rounded-md shadow-sm text-sm font-medium text-white transition duration-200 ease-in-out
                transform hover:scale-105"
                        >
                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                            View
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 p-2">
                {guild.is_active ? (
                    <>
                        <div
                            data-tooltip-id="tooltip-active-guild"
                            data-tooltip-content="The bot is a member of this guild."
                            className={
                                "w-3 h-3 bg-green-500 rounded-full shadow-md hover:cursor-pointer"
                            }
                        ></div>
                        <Tooltip id="tooltip-active-guild" />
                    </>
                ) : (
                    <>
                        <div
                            data-tooltip-id="tooltip-inactive-guild"
                            data-tooltip-content="The bot is no longer a member of this guild."
                            className={
                                "w-3 h-3 bg-red-500 rounded-full shadow-md hover:cursor-pointer"
                            }
                        ></div>
                        <Tooltip id="tooltip-inactive-guild" />
                    </>
                )}
            </div>

            {
                // if the guild wasn't fetched, add an icon top left so the user knows
                guild.guild_name === null ? (
                    <div
                        className={
                            "absolute top-0 right-0 p-2 hover:cursor-pointer"
                        }
                        title="This guild could not be fetched due to Discord API rate limits. Please try again in a few minutes."
                    >
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="text-xl text-red-600"
                        />
                    </div>
                ) : (
                    ""
                )
            }
        </div>
    );
};

export default Guildcard;
