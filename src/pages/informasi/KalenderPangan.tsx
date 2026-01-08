'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const panganData = [
  { komoditas: 'Padi', masaTanam: 'Oktober - Desember', masaPanen: 'Februari - April' },
  { komoditas: 'Jagung', masaTanam: 'April - Juni', masaPanen: 'Juli - September' },
  { komoditas: 'Kacang Tanah', masaTanam: 'Mei - Juli', masaPanen: 'Agustus - Oktober' },
  { komoditas: 'Ubi Kayu', masaTanam: 'Sepanjang Tahun', masaPanen: '8-12 bulan setelah tanam' },
  { komoditas: 'Cabai', masaTanam: 'Maret - Mei', masaPanen: 'Juni - Agustus' },
];

const KalenderPangan = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kalender Pangan Desa</h1>
      <Card>
        <CardHeader>
          <CardTitle>Jadwal Tanam dan Panen</CardTitle>
          <CardDescription>Perkiraan waktu tanam dan panen untuk komoditas utama di desa.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Komoditas</TableHead>
                <TableHead>Masa Tanam</TableHead>
                <TableHead>Masa Panen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {panganData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.komoditas}</TableCell>
                  <TableCell>{item.masaTanam}</TableCell>
                  <TableCell>{item.masaPanen}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default KalenderPangan;
