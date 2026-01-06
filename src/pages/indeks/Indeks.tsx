import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Indeks = () => {
  const indeksItems = [
    {
      title: "IDM",
      description: "Indeks Desa Membangun",
      path: "/indeks/idm"
    },
    {
      title: "Ketahanan Desa",
      description: "Indeks Ketahanan Desa",
      path: "/indeks/ketahanan-desa"
    },
    {
      title: "Ketahanan Ekonomi",
      description: "Indeks Ketahanan Ekonomi",
      path: "/indeks/ketahanan-ekonomi"
    },
    {
      title: "Ketahanan Lingkungan",
      description: "Indeks Ketahanan Lingkungan",
      path: "/indeks/ketahanan-lingkungan"
    },
    {
      title: "Ketahanan Sosial",
      description: "Indeks Ketahanan Sosial",
      path: "/indeks/ketahanan-sosial"
    },
    {
      title: "SDGs",
      description: "Sustainable Development Goals",
      path: "/indeks/sdgs"
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Indeks Desa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indeksItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Klik untuk melihat detail
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Indeks; 