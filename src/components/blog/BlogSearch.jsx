import { Search } from "lucide-react";

function BlogSearch({ onSearch }) {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Keresés a cikkek között..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-white bg-opacity-10 border border-purple-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300" />
      </div>
    </div>
  );
}

export default BlogSearch;
