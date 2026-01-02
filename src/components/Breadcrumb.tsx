'use client';
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Beranda
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4" />
              {item.path ? (
                <Link
                  href={item.path}
                  className="ml-1 text-sm font-medium hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <span className="ml-1 text-sm font-medium text-foreground">
                  {item.title}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
