'use client';
import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { recentPosts } from '@/lib/placeholder-images.json';
import type { SiteSettings } from "@/lib/site-settings-actions";

const LandingPage = ({ settings }: { settings: SiteSettings | null }) => {
  return (
    <div className="flex-1">
      <Hero heroUrl={settings?.heroUrl} />
    </div>
  );
};

export default LandingPage;
