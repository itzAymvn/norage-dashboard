import { Guild } from "@/app/types";
import Image from "next/image";
import Updateprefix from "./Updateprefix";
import Blacklist from "./Toggles/Blacklist";

const Guilddata = ({ guild }: { guild: Guild }) => {
    return (
        <>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 md:p-6 w-full md:flex items-start justify-start transition duration-200 ease-in-out transform break-words">
                {/* Guild Icon */}
                <Image
                    src={guild.guild_icon || "/discord.png"}
                    alt={guild.guild_name + " icon"}
                    width={128}
                    height={128}
                />

                {/* Guild Information */}
                <div className="md:ml-4">
                    <h3 className="text-white text-xl md:text-2xl font-semibold">
                        {guild.guild_name}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base mt-2">
                        {guild.guild_description}
                    </p>

                    {/* Guild Created At and Updated At */}
                    <div className="mt-2 p-2 border-t bg-gray-800 border-gray-700 rounded-md">
                        <p className="text-gray-400 text-xs md:text-sm">
                            <span>Joined at: </span>
                            <span className="ml-1">
                                {new Date(guild.createdAt).toLocaleString()}
                            </span>
                        </p>
                        <p className="text-gray-400 text-xs md:text-sm">
                            <span>Last updated at</span>
                            <span className="ml-1">
                                {new Date(guild.updatedAt).toLocaleString()}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Guild Settings */}
            <div className="mt-4 md:mt-0 p-4 md:p-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg transition duration-200 ease-in-out transform break-words">
                <h3 className="text-white text-xl md:text-2xl font-semibold">
                    Guild Settings
                </h3>
                <p className="text-gray-400 text-sm md:text-base mt-2">
                    Prefix: {guild.prefix}
                </p>

                <Updateprefix guild={guild} />

                <h3 className="text-white text-xl md:text-2xl font-semibold mt-4">
                    Guild toggles
                </h3>

                <Blacklist guild={guild} />
            </div>
        </>
    );
};

export default Guilddata;
