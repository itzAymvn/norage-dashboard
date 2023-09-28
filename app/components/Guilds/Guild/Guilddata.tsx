import { Guild } from "@/app/types";
import Image from "next/image";
import Updateprefix from "./Updateprefix";
import Blacklist from "./Toggles/Blacklist";

const Guilddata = ({ guild }: { guild: Guild }) => {
    return (
        <>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 md:p-6 w-full md:flex items-center justify-between transition duration-200 ease-in-out transform break-words">
                {/* Guild Icon */}
                <Image
                    src={guild.guildData.iconURL || "/discord.png"}
                    alt={guild.guildData.name + " icon"}
                    width={128}
                    height={128}
                />

                {/* Guild Information */}
                <div className="md:ml-4">
                    <h3 className="text-white text-xl md:text-2xl font-semibold">
                        {guild.guildData.name}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base mt-2">
                        {guild.guildData.description}
                    </p>
                </div>

                {/* Guild Stats */}
                <div className="md:text-right mt-4 md:mt-0 p-4 md:p-6 bg-gray-900 rounded-lg">
                    <p className="text-gray-400 text-sm md:text-base">
                        {guild.guildData.approximate_member_count} members
                    </p>
                    <p className="text-gray-400 text-sm md:text-base">
                        {guild.guildData.approximate_presence_count} online
                    </p>
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
