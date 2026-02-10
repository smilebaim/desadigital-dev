'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

interface StatCardProps {
  title: string;
  description: string;
  placeholder: string;
  children: React.ReactNode; // For the preview component
}

const StatCard: React.FC<StatCardProps> = ({ title, description, placeholder, children }) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(placeholder).then(() => {
      toast({
        title: "Disalin!",
        description: "Placeholder telah disalin ke clipboard.",
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-4 text-center">Preview</h4>
          <div className="h-[250px] flex items-center justify-center">
            {children}
          </div>
        </div>
        <div>
          <Label htmlFor={`placeholder-code-${title.replace(/\s+/g, '-')}`}>Placeholder</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input id={`placeholder-code-${title.replace(/\s+/g, '-')}`} readOnly value={placeholder} />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <span className="sr-only">Salin Placeholder</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Salin dan tempel kode di atas ke dalam editor halaman kustom untuk menampilkan visualisasi ini.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
