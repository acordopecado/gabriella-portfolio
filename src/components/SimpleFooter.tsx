import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';

export const SimpleFooter: React.FC = () => {
  return (
    <footer className="py-10 bg-[#dfd8cb] text-[#2e3137]/70 text-xs">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <div className="h-3.5 w-14 overflow-hidden flex items-start">
            <img
              src="/logo.png"
              alt="gabi"
              className="w-full h-auto object-cover object-top"
            />
          </div>
          <span className="font-bold text-[#6c1e17] lowercase">
            gabi
          </span>
          <span aria-hidden="true" className="text-[#2e3137]/30">·</span>
          <span className="italic">i make information look interesting.</span>
        </div>

        {/* Minimalist Underlined Links */}
        <div className="flex items-center gap-5 font-medium">
          <a
            href="https://www.behance.net/gabriellasalesm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#244287] underline underline-offset-4 decoration-1 hover:text-[#183168] inline-flex items-center gap-1"
          >
            <span>behance</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span aria-hidden="true" className="text-[#2e3137]/30">·</span>
          <a
            href="https://medium.com/@gabriellasalesm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2e3137] underline underline-offset-4 decoration-1 hover:text-[#6c1e17] inline-flex items-center gap-1"
          >
            <span>medium</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span aria-hidden="true" className="text-[#2e3137]/30">·</span>
          <a
            href="mailto:gabriellasalesm@gmail.com"
            className="text-[#6c1e17] underline underline-offset-4 decoration-1 inline-flex items-center gap-1"
          >
            <Mail className="w-3 h-3" />
            <span>email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
