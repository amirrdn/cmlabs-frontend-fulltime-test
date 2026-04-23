export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-gray-900">
              Meal<span className="text-orange-500">Finder</span>
            </h3>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Find meals by ingredient.
            </p>
          </div>
          <div className="w-full pt-8 border-t border-gray-200/50 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Amir Rudin.{" "}
            <a
              href="https://amir-rudin-portofolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-500 transition-colors hover:text-teal-600"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
