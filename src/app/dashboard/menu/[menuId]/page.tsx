'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMenuDetails } from "@/lib/menu-actions";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import type { Menu, MenuItem } from '@/lib/menu-data';
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

type MenuWithItems = Menu & { items: MenuItem[] };

const MenuItemsPage = () => {
  const params = useParams();
  const menuId = params.menuId as string;
  
  const [menuDetails, setMenuDetails] = useState<MenuWithItems | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (menuId) {
      const fetchMenuDetails = async () => {
        try {
          const details = await getMenuDetails(parseInt(menuId, 10));
          setMenuDetails(details as MenuWithItems);
        } catch (error) {
          console.error("Failed to fetch menu details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMenuDetails();
    }
  }, [menuId]);

  if (loading) {
    return <div>Memuat data menu...</div>;
  }

  if (!menuDetails) {
    return <div>Menu tidak ditemukan.</div>;
  }

  const parentItems = menuDetails.items.filter(item => !item.parentId);
  const getSubItems = (parentId: number) => {
    return menuDetails.items.filter(item => item.parentId === parentId);
  }

  return (
    <div className="space-y-6">
       <Breadcrumb items={[
        { title: "Dashboard", path: "/dashboard" },
        { title: "Kelola Menu", path: "/dashboard/menu" },
        { title: menuDetails.name }
      ]} />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Item untuk &quot;{menuDetails.name}&quot;</h2>
          <p className="text-muted-foreground">
            Atur item yang akan tampil pada menu ini
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Item Menu
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Item</CardTitle>
          <CardDescription>
            Total item: {menuDetails.items.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Item</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parentItems.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.path}</TableCell>
                    <TableCell>{item.icon}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {getSubItems(item.id).map(subItem => (
                     <TableRow key={subItem.id}>
                        <TableCell className="pl-10 font-medium flex items-center">
                          <ChevronRight className="h-4 w-4 mr-2" />
                          {subItem.title}
                        </TableCell>
                        <TableCell>{subItem.path}</TableCell>
                        <TableCell>{subItem.icon}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" /> Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuItemsPage;
