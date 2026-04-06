'use client';
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  UserCheck,
  UserX,
  Trash2,
  ShieldAlert,
  Mail,
  Building2,
  Crown,
  Shield,
  User,
  Clock,
  CalendarDays,
  Filter,
  UserPlus,
} from "lucide-react";
import {
  getUsersStream,
  inviteUser,
  updateUserRole,
  updateUserStatus,
  deleteUserDoc,
  UserData,
  UserRole,
  UserStatus,
} from "@/lib/user-actions";
import { getTenantsStream, TenantData } from "@/lib/tenant-actions";

// ─── Constants ────────────────────────────────────────────────────────────────
const ROLES: { value: UserRole; label: string }[] = [
  { value: 'superadmin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin Desa' },
  { value: 'staff', label: 'Staff Desa' },
];

// ─── Role Badge ────────────────────────────────────────────────────────────────
const RoleBadge = ({ role }: { role: UserRole }) => {
  const cfg = {
    superadmin: { icon: Crown, cls: 'bg-red-500/10 text-red-400 border-red-500/20', label: 'Super Admin' },
    admin:      { icon: Shield, cls: 'bg-blue-500/10 text-blue-400 border-blue-500/20', label: 'Admin Desa' },
    staff:      { icon: User, cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', label: 'Staff' },
    pending:    { icon: Clock, cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20', label: 'Pending' },
  }[role] ?? { icon: User, cls: 'bg-slate-700 text-slate-400 border-slate-700', label: role };

  const Icon = cfg.icon;
  return (
    <Badge variant="outline" className={`${cfg.cls} text-[10px] px-2 py-0.5 gap-1`}>
      <Icon size={10} />
      {cfg.label}
    </Badge>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: UserStatus }) => {
  const cfg = {
    active:   { cls: 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400 animate-pulse', label: 'Aktif' },
    disabled: { cls: 'bg-red-500/5 text-red-400 border-red-500/20', dot: 'bg-red-400', label: 'Dinonaktifkan' },
    pending:  { cls: 'bg-amber-500/5 text-amber-400 border-amber-500/20', dot: 'bg-amber-400', label: 'Pending' },
  }[status] ?? { cls: 'bg-slate-800 text-slate-400 border-slate-700', dot: 'bg-slate-400', label: status };

  return (
    <Badge variant="outline" className={`${cfg.cls} text-[10px] px-2 py-0.5`}>
      <span className={`w-1 h-1 rounded-full mr-1.5 inline-block ${cfg.dot}`} />
      {cfg.label}
    </Badge>
  );
};

// ─── Format Date ──────────────────────────────────────────────────────────────
const formatDate = (ts: any): string => {
  if (!ts) return '—';
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return '—'; }
};

// ─── Avatar Fallback ──────────────────────────────────────────────────────────
const UserAvatar = ({ name, email }: { name: string; email: string }) => {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : email.charAt(0).toUpperCase();
  const colors = [
    'from-blue-600 to-blue-800',
    'from-emerald-600 to-emerald-800',
    'from-purple-600 to-purple-800',
    'from-amber-600 to-amber-800',
    'from-rose-600 to-rose-800',
  ];
  const colorIndex = email.charCodeAt(0) % colors.length;
  return (
    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
      {initials}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
const UserManagementPage = () => {
  const { toast } = useToast();

  // Data states
  const [users, setUsers] = useState<UserData[]>([]);
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Invite Dialog
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    displayName: '',
    email: '',
    role: 'staff' as UserRole,
    tenantId: '',
    tenantName: '',
  });

  // Delete Confirm
  const [deleteTarget, setDeleteTarget] = useState<UserData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Effects ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const unsub = getUsersStream((data) => {
      setUsers(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = getTenantsStream((data) => setTenants(data));
    return () => unsub();
  }, []);

  // ── Filtered users ────────────────────────────────────────────────────────────
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        u.displayName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.tenantName?.toLowerCase().includes(q);
      const matchesRole = filterRole === 'all' || u.role === filterRole;
      const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, filterRole, filterStatus]);

  // ── Stats ─────────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    disabled: users.filter(u => u.status === 'disabled').length,
  }), [users]);

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.displayName.trim() || !inviteForm.email.trim()) return;

    setIsInviting(true);
    const result = await inviteUser(inviteForm);
    if (result.success) {
      toast({
        title: '✅ Undangan Terkirim',
        description: `Akun untuk "${inviteForm.displayName}" (${inviteForm.email}) telah dibuat dengan status Pending.`,
      });
      setIsInviteOpen(false);
      setInviteForm({ displayName: '', email: '', role: 'staff', tenantId: '', tenantName: '' });
    } else {
      toast({ title: 'Gagal', description: result.error, variant: 'destructive' });
    }
    setIsInviting(false);
  };

  const handleToggleStatus = async (user: UserData) => {
    if (!user.id) return;
    const newStatus: UserStatus = user.status === 'active' ? 'disabled' : 'active';
    const result = await updateUserStatus(user.id, newStatus);
    if (result.success) {
      toast({
        title: newStatus === 'active' ? '▶️ Akun Diaktifkan' : '⏸️ Akun Dinonaktifkan',
        description: `Status "${user.displayName || user.email}" diubah menjadi ${newStatus.toUpperCase()}.`,
      });
    } else {
      toast({ title: 'Gagal', description: result.error, variant: 'destructive' });
    }
  };

  const handleChangeRole = async (user: UserData, newRole: UserRole) => {
    if (!user.id) return;
    const result = await updateUserRole(user.id, newRole);
    if (result.success) {
      toast({
        title: '🔐 Role Diperbarui',
        description: `Role "${user.displayName || user.email}" diubah menjadi ${newRole.toUpperCase()}.`,
      });
    } else {
      toast({ title: 'Gagal', description: result.error, variant: 'destructive' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget?.id) return;
    setIsDeleting(true);
    const result = await deleteUserDoc(deleteTarget.id);
    if (result.success) {
      toast({ title: '🗑️ Akun Dihapus', description: `Data "${deleteTarget.displayName || deleteTarget.email}" telah dihapus dari sistem.` });
    } else {
      toast({ title: 'Gagal', description: result.error, variant: 'destructive' });
    }
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const handleTenantSelect = (tenantId: string) => {
    const tenant = tenants.find(t => t.subdomain === tenantId);
    setInviteForm(p => ({
      ...p,
      tenantId,
      tenantName: tenant?.name ?? '',
    }));
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Users className="h-7 w-7 text-blue-400" />
            Manajemen User
          </h2>
          <p className="text-slate-400 mt-1 text-sm">
            Kelola akun staff dan administrator seluruh desa dalam platform DesaHub.
          </p>
        </div>
        <Button
          onClick={() => setIsInviteOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 shrink-0"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Tambah User
        </Button>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Total User', value: stats.total, color: 'blue', dot: 'bg-blue-400' },
          { label: 'Akun Aktif', value: stats.active, color: 'emerald', dot: 'bg-emerald-400 animate-pulse' },
          { label: 'Menunggu Aktivasi', value: stats.pending, color: 'amber', dot: 'bg-amber-400' },
          { label: 'Dinonaktifkan', value: stats.disabled, color: 'red', dot: 'bg-red-400' },
        ].map((s) => (
          <Card key={s.label} className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-20 h-20 bg-${s.color}-500/5 blur-3xl rounded-full -mr-4 -mt-4`} />
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{s.label}</p>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                Dari total {stats.total} akun
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Users Table ── */}
      <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-white text-lg">Daftar Akun</CardTitle>
              <CardDescription className="text-slate-400 text-xs mt-1">
                {filteredUsers.length} dari {users.length} user ditampilkan
              </CardDescription>
            </div>
            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <Input
                  placeholder="Cari nama, email, desa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-9 text-sm"
                />
              </div>
              {/* Role Filter */}
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-36 h-9 bg-slate-950 border-slate-800 text-sm focus:ring-blue-600">
                  <Filter size={12} className="mr-1 text-slate-500 shrink-0" />
                  <SelectValue placeholder="Semua Role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="all">Semua Role</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin Desa</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36 h-9 bg-slate-950 border-slate-800 text-sm focus:ring-blue-600">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="disabled">Dinonaktifkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-b border-slate-800">
              <TableRow className="hover:bg-transparent border-slate-800">
                <TableHead className="text-slate-400 text-xs">Pengguna</TableHead>
                <TableHead className="text-slate-400 text-xs">Role</TableHead>
                <TableHead className="text-slate-400 text-xs">Status</TableHead>
                <TableHead className="text-slate-400 text-xs">Desa / Tenant</TableHead>
                <TableHead className="text-slate-400 text-xs">Terdaftar</TableHead>
                <TableHead className="text-right text-slate-400 text-xs">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i} className="border-slate-800">
                    <TableCell colSpan={6}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse shrink-0" />
                        <div className="h-4 bg-slate-800 rounded animate-pulse flex-1" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <TableRow key={u.id} className="border-slate-800 hover:bg-slate-800/40 transition-all duration-150">
                    {/* User Info */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserAvatar name={u.displayName} email={u.email} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-200 truncate">
                            {u.displayName || <span className="text-slate-500 italic">Belum diatur</span>}
                          </p>
                          <p className="text-xs text-slate-500 truncate font-mono">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    {/* Role */}
                    <TableCell>
                      <RoleBadge role={u.role} />
                    </TableCell>
                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={u.status} />
                    </TableCell>
                    {/* Tenant */}
                    <TableCell>
                      {u.tenantId ? (
                        <div className="flex items-center gap-1.5">
                          <Building2 size={11} className="text-slate-600 shrink-0" />
                          <span className="text-slate-300 text-xs font-medium">{u.tenantName || u.tenantId}</span>
                        </div>
                      ) : (
                        <span className="text-slate-600 text-xs italic">Platform-level</span>
                      )}
                    </TableCell>
                    {/* Date */}
                    <TableCell className="text-slate-500 text-xs">
                      <div className="flex items-center gap-1">
                        <CalendarDays size={11} />
                        {formatDate(u.createdAt)}
                      </div>
                    </TableCell>
                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white hover:bg-slate-800 h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200 shadow-2xl p-1.5 min-w-[180px]">
                          {/* Change Role submenu */}
                          <div className="px-2 py-1.5">
                            <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-1.5 font-bold">Ubah Role</p>
                            <div className="space-y-0.5">
                              {ROLES.map((r) => (
                                <button
                                  key={r.value}
                                  onClick={() => handleChangeRole(u, r.value)}
                                  className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                                    u.role === r.value
                                      ? 'bg-blue-600/20 text-blue-400 font-medium'
                                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                  }`}
                                >
                                  {r.label} {u.role === r.value && '✓'}
                                </button>
                              ))}
                            </div>
                          </div>
                          <DropdownMenuSeparator className="bg-slate-800 my-1" />
                          {/* Toggle Status */}
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(u)}
                            className={`cursor-pointer rounded-md gap-2.5 ${
                              u.status === 'active' || u.status === 'pending'
                                ? 'text-amber-400 hover:bg-amber-500/10 focus:bg-amber-500/10'
                                : 'text-emerald-400 hover:bg-emerald-500/10 focus:bg-emerald-500/10'
                            }`}
                          >
                            {u.status === 'active' || u.status === 'pending'
                              ? <><UserX className="h-3.5 w-3.5 shrink-0" /> Nonaktifkan Akun</>
                              : <><UserCheck className="h-3.5 w-3.5 shrink-0" /> Aktifkan Kembali</>
                            }
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-800 my-1" />
                          <DropdownMenuItem
                            className="text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300 cursor-pointer rounded-md gap-2.5"
                            onClick={() => setDeleteTarget(u)}
                          >
                            <Trash2 className="h-3.5 w-3.5 shrink-0" />
                            Hapus Akun
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : searchQuery || filterRole !== 'all' || filterStatus !== 'all' ? (
                <TableRow className="border-slate-800">
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 text-slate-700" />
                      <p className="text-slate-500 font-medium text-sm">Tidak ada hasil yang cocok</p>
                      <p className="text-slate-600 text-xs">Coba ubah filter atau kata kunci pencarian</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow className="border-slate-800">
                  <TableCell colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-slate-800/60 flex items-center justify-center">
                        <Users className="h-8 w-8 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-slate-500 font-medium">Belum ada akun user</p>
                        <p className="text-slate-600 text-xs mt-0.5">Mulai dengan menambahkan staff desa pertama</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setIsInviteOpen(true)}
                        className="mt-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> Tambah User
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ════════════════════════════════════════════════════
          DIALOG: Invite User
      ════════════════════════════════════════════════════ */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 shadow-2xl sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-400" />
              Tambah Akun User
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Buat akun baru untuk staff atau administrator desa. Akun akan berstatus <span className="text-amber-400 font-medium">Pending</span> hingga user pertama kali login.
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-slate-800/60" />
          <form onSubmit={handleInvite} className="space-y-4 pt-2">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="inv-name" className="text-[10px] uppercase tracking-widest text-slate-400">
                Nama Lengkap
              </Label>
              <Input
                id="inv-name"
                placeholder="Budi Santoso"
                value={inviteForm.displayName}
                onChange={(e) => setInviteForm(p => ({ ...p, displayName: e.target.value }))}
                disabled={isInviting}
                className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11"
              />
            </div>
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="inv-email" className="text-[10px] uppercase tracking-widest text-slate-400">
                Alamat Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  id="inv-email"
                  type="email"
                  placeholder="staff@sukamaju.desa.id"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(p => ({ ...p, email: e.target.value }))}
                  disabled={isInviting}
                  className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11 pl-9"
                />
              </div>
            </div>
            {/* Role */}
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-widest text-slate-400">Role</Label>
              <Select
                value={inviteForm.role}
                onValueChange={(v) => setInviteForm(p => ({ ...p, role: v as UserRole }))}
                disabled={isInviting}
              >
                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 focus:ring-blue-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  {ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Tenant */}
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-widest text-slate-400">
                Desa / Tenant <span className="text-slate-600">(opsional)</span>
              </Label>
              <Select
                value={inviteForm.tenantId || 'none'}
                onValueChange={(v) => handleTenantSelect(v === 'none' ? '' : v)}
                disabled={isInviting}
              >
                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 focus:ring-blue-600">
                  <SelectValue placeholder="Platform-level (tidak terikat desa)" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="none">
                    <span className="text-slate-400 italic">Platform-level</span>
                  </SelectItem>
                  {tenants.map((t) => (
                    <SelectItem key={t.subdomain} value={t.subdomain}>
                      {t.name} ({t.subdomain})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {inviteForm.tenantId && (
                <p className="text-[10px] text-slate-500">
                  User ini akan diasosiasikan dengan desa <span className="text-blue-400 font-mono">{inviteForm.tenantId}</span>
                </p>
              )}
            </div>

            <DialogFooter className="pt-2 gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsInviteOpen(false)}
                className="text-slate-400 hover:bg-slate-800"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isInviting || !inviteForm.displayName.trim() || !inviteForm.email.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg shadow-blue-500/20"
              >
                {isInviting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Membuat Akun...
                  </span>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-1.5" />
                    Buat Akun
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════════════════════════════
          ALERT DIALOG: Confirm Delete User
      ════════════════════════════════════════════════════ */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-400" />
              Konfirmasi Hapus Akun
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Tindakan ini akan menghapus data akun{' '}
              <span className="text-white font-semibold">
                "{deleteTarget?.displayName || deleteTarget?.email}"
              </span>{' '}
              dari Firestore secara permanen.
              <span className="block mt-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg text-amber-400/80 text-xs leading-relaxed">
                ⚠️ Catatan: Ini hanya menghapus data Firestore. Jika akun Firebase Auth sudah dibuat, user tetap bisa login ulang dan akunnya akan dibuat ulang.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menghapus...
                </span>
              ) : 'Ya, Hapus Akun'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default UserManagementPage;
