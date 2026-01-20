
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const programData = [
  {
    nama: "Pembangunan Jalan Usaha Tani",
    bidang: "Infrastruktur",
    sumberDana: "Dana Desa",
    anggaran: "Rp 250.000.000",
    status: "Selesai",
  },
  {
    nama: "Pemberian Makanan Tambahan (PMT) untuk Balita",
    bidang: "Kesehatan",
    sumberDana: "APBD",
    anggaran: "Rp 50.000.000",
    status: "Berjalan",
  },
  {
    nama: "Pelatihan Digital Marketing untuk UMKM",
    bidang: "Ekonomi",
    sumberDana: "BUMDes",
    anggaran: "Rp 25.000.000",
    status: "Perencanaan",
  },
  {
    nama: "Rehabilitasi Gedung PAUD",
    bidang: "Pendidikan",
    sumberDana: "Dana Desa",
    anggaran: "Rp 75.000.000",
    status: "Berjalan",
  },
];

const DaftarProgram = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Pembangunan", path: "/pembangunan/daftar-program" }, { title: "Daftar Program" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Daftar Program Pembangunan</h1>
      <Card>
        <CardHeader>
          <CardTitle>Program Pembangunan Desa</CardTitle>
          <CardDescription>
            Berikut adalah daftar program dan kegiatan pembangunan yang sedang dan akan dilaksanakan di desa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Program/Kegiatan</TableHead>
                <TableHead>Bidang</TableHead>
                <TableHead>Sumber Dana</TableHead>
                <TableHead>Anggaran</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programData.map((program, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{program.nama}</TableCell>
                  <TableCell>{program.bidang}</TableCell>
                  <TableCell>{program.sumberDana}</TableCell>
                  <TableCell>{program.anggaran}</TableCell>
                  <TableCell>
                     <span className={`px-2 py-1 rounded-full text-xs ${
                        program.status === 'Selesai' 
                          ? 'bg-green-100 text-green-800' 
                          : program.status === 'Berjalan'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {program.status}
                      </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DaftarProgram;
