export const Skeleton = () => {
    return (
        <div className="w-full p-4 bg-loader rounded-lg h-16 animate-pulse">
            <div className="h-4 bg-loaderInside rounded w-3/4 mb-2" />
            <div className="h-3 bg-loaderInside rounded w-full" />
        </div>
    );
};
