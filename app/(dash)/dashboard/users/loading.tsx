import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg opacity-90 flex flex-col items-center space-y-6 md:w-96">
                <Image
                    src="/logo.png"
                    alt="NoRage Logo"
                    width={100}
                    priority
                    height={100}
                    className="mb-4"
                />
                <h1 className="text-4xl font-bold text-white mb-2 text-center">
                    NoRage
                </h1>
                <p className="text-lg font-semibold text-gray-300 mb-6 text-center">
                    Loading...
                </p>
            </div>
        </div>
    );
}
