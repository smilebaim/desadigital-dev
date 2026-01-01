'use client';
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      <Link href="/" className="hover:text-foreground transition-colors">
        Beranda
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.path ? (
            <Link href={item.path} className="hover:text-foreground transition-colors">
              {item.title}
            </Link>
          ) : (
            <span>{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
