import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

function SocialShare({ article }) {
  const url = window.location.href;
  const title = article.title;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    email: `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(url)}`,
  };

  return (
    <div className="border-t border-purple-700 pt-6">
      <h3 className="text-white font-semibold mb-3">Oszd meg másokkal is:</h3>
      <div className="flex space-x-4">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.email}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Share via Email"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

export default SocialShare;
