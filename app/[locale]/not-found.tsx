import { Link } from "@/helpers/navigation";

const NotFound = () => {
    return (
        <div className="mt-10 text-center text-primary">
            <h1>Упс!</h1>
            <div className="text-xl mt-3">Такої сторінки не знайдено</div>
            <Link
                href="/"
                className="text-purple hover:text-purple-dark duration-300 mt-1 block"
            >
                Повернутися на головну...
            </Link>
        </div>
    );
};

export default NotFound;
