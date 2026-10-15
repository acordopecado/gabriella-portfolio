import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2e3137]/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#dfd8cb] border border-[#2e3137]/20 rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-[#2e3137]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimalist Close Link */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xs text-[#2e3137]/70 hover:text-[#6c1e17] underline underline-offset-4 decoration-1 inline-flex items-center gap-1 cursor-pointer"
          aria-label="Close"
        >
          <span>close</span>
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="mb-5">
          <span className="text-xs uppercase font-bold tracking-wider text-[#6c1e17] block mb-1">
            get in touch
          </span>
          <h2 className="text-xl font-bold text-[#2e3137]">
            contact gabi
          </h2>
          <p className="text-xs text-[#2e3137]/75 mt-1">
            Available for information design, data visualization, and editorial projects.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-[#244287] mx-auto" />
            <h3 className="text-base font-bold text-[#2e3137]">
              Message Sent!
            </h3>
            <p className="text-xs text-[#2e3137]/75">
              Thank you {formState.name}. I will reply to {formState.email} shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormState({ name: '', email: '', message: '' });
                onClose();
              }}
              className="mt-3 text-xs font-semibold text-[#6c1e17] underline underline-offset-4 decoration-1 cursor-pointer"
            >
              done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#2e3137]/80 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-3 py-2 text-xs bg-[#ece5d8] border border-[#2e3137]/15 rounded-lg text-[#2e3137] focus:outline-hidden focus:border-[#6c1e17]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2e3137]/80 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="your.email@domain.com"
                className="w-full px-3 py-2 text-xs bg-[#ece5d8] border border-[#2e3137]/15 rounded-lg text-[#2e3137] focus:outline-hidden focus:border-[#6c1e17]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2e3137]/80 mb-1">
                Message
              </label>
              <textarea
                rows={3}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tell me about your dataset or project..."
                className="w-full px-3 py-2 text-xs bg-[#ece5d8] border border-[#2e3137]/15 rounded-lg text-[#2e3137] focus:outline-hidden focus:border-[#6c1e17]"
              />
            </div>

            {/* Minimalist Submit: NO background, NO border, ONLY underlined text & icon */}
            <div className="pt-2">
              <button
                type="submit"
                className="text-xs font-bold text-[#6c1e17] underline underline-offset-4 decoration-1 hover:text-[#244287] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>send message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-[#2e3137]/10 flex items-center justify-between text-xs text-[#2e3137]/75">
          <a
            href="mailto:gabriellasalesm@gmail.com"
            className="text-[#6c1e17] underline underline-offset-4 decoration-1 inline-flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>gabriellasalesm@gmail.com</span>
          </a>

          <a
            href="https://www.behance.net/gabriellasalesm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#244287] underline underline-offset-4 decoration-1 inline-flex items-center gap-1"
          >
            <span>behance</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
