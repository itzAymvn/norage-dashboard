import Link from "next/link";
import Image from "next/image";
import { Guild } from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const Guildcard = ({ guild }: { guild: Guild }) => {
    return (
        <div
            className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900
            p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform break-words relative"
        >
            <div className="flex flex-col items-center">
                <div className="flex-shrink-0">
                    <Image
                        src={`${guild.guildData.iconURL}` || "/discord.png"}
                        alt={guild.guildData.name + " icon"}
                        width={128}
                        height={128}
                        className="rounded-full"
                    />
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-center text-white">
                        {guild.guildData.name}
                    </h3>

                    <p className="text-sm text-center text-gray-400">
                        <span>
                            {guild.guildData.approximate_member_count} members
                        </span>
                        <span className="mx-1">•</span>
                        <span>
                            {guild.guildData.approximate_presence_count} online
                        </span>
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
        </div>
    );
};

export default Guildcard;
