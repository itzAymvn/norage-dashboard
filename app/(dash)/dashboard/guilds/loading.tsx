import Spinner from "@/app/components/Spinner";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-100 bg-gray-800 ">
            <Spinner />
        </div>
    );
}
