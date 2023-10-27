import { Metadata } from "next";

export const metadata: Metadata = {
	title: "NoRage - Dashboard",
	description: "NoRage Dashboard for the NoRage Discord Bot & MongoDB",
	keywords: "NoRage, Dashboard, Discord, Bot, MongoDB, Hypixel, Minecraft",
};
const page = async () => {
	return (
		<h3 className="text-3xl font-bold text-white">
			You are viewing the dashboard, <i>you shouldn't be here.</i>
		</h3>
	);
};

export default page;
