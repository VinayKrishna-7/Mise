import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center text-xs font-medium mb-6 overflow-x-auto whitespace-nowrap py-1 text-ink-muted dark:text-ink-dark-muted" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="text-ink dark:text-ink-dark font-semibold truncate max-w-xs sm:max-w-md">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                className="hover:text-terracotta dark:hover:text-terracotta-night transition-colors flex items-center gap-1"
              >
                {isFirst && <Home size={12} />}
                <span>{item.label}</span>
              </Link>
            )}
            {!isLast && <ChevronRight size={12} className="mx-2 text-border dark:text-border-dark shrink-0" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
